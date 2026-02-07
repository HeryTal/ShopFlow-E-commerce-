// app/api/clerk/route.js - CORRIGÉ
import mongoose from "mongoose"

export const dynamic = 'force-dynamic'

// Connexion MongoDB
async function connectDB() {
    if (mongoose.connection.readyState === 1) return true
    
    const uri = process.env.MONGODB_URI
    if (!uri) {
        console.error("❌ MONGODB_URI manquant")
        return false
    }
    
    try {
        await mongoose.connect(uri)
        console.log("✅ MongoDB connected")
        return true
    } catch (error) {
        console.error("❌ MongoDB error:", error.message)
        return false
    }
}

// Schéma User
const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    cartItems: { type: Object, default: {} },
}, { minimize: false })

const User = mongoose.models.User || mongoose.model('User', userSchema)

export async function POST(request) {
    console.log("📨 Clerk webhook received")
    
    try {
        const payload = await request.json()
        console.log("Event type:", payload.type)
        console.log("Full payload:", JSON.stringify(payload, null, 2))
        
        if (payload.type === 'user.created') {
            // DEBUG: Voir la structure des données
            console.log("Email addresses array:", payload.data.email_addresses)
            console.log("First email object:", payload.data.email_addresses?.[0])
            
            // CORRECTION : Prendre le bon chemin
            const emailObj = payload.data.email_addresses?.[0]
            const email = emailObj?.email_address
            
            if (!email) {
                console.error("❌ No email found in:", payload.data.email_addresses)
                // Fallback: utiliser un email temporaire
                const tempEmail = `user_${payload.data.id}@temp.com`
                console.log("Using temporary email:", tempEmail)
                
                return Response.json({ 
                    success: false, 
                    error: "No email found",
                    tempEmailUsed: tempEmail
                })
            }
            
            console.log("📧 User email:", email)
            
            // Connexion MongoDB
            const connected = await connectDB()
            if (!connected) {
                return Response.json({ success: false, error: "DB connection failed" })
            }
            
            // Données utilisateur
            const userData = {
                clerkId: payload.data.id,
                email: email,
                name: `${payload.data.first_name || ''} ${payload.data.last_name || ''}`.trim() || email.split('@')[0],
                imageUrl: payload.data.image_url || '/default-avatar.png',
                cartItems: {}
            }
            
            console.log("💾 Saving user:", userData)
            
            // Sauvegarde
            try {
                const user = await User.findOneAndUpdate(
                    { clerkId: payload.data.id },
                    userData,
                    { 
                        upsert: true, 
                        new: true,
                        setDefaultsOnInsert: true 
                    }
                )
                
                console.log("✅ User saved to MongoDB!")
                console.log("User details:", {
                    id: user._id,
                    clerkId: user.clerkId,
                    email: user.email,
                    name: user.name
                })
                
                return Response.json({ 
                    success: true,
                    user: {
                        id: user.clerkId,
                        email: user.email,
                        name: user.name,
                        mongoId: user._id
                    }
                })
                
            } catch (dbError) {
                if (dbError.code === 11000) {
                    console.log("⚠️ User already exists")
                    // Récupérer l'utilisateur existant
                    const existingUser = await User.findOne({ clerkId: payload.data.id })
                    return Response.json({ 
                        success: true, 
                        warning: "User already exists",
                        existingUser: existingUser
                    })
                }
                console.error("❌ DB error:", dbError)
                throw dbError
            }
        }
        
        return Response.json({ success: true })
        
    } catch (error) {
        console.error("❌ Webhook error:", error)
        return Response.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 })
    }
}