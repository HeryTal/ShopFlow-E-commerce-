// app/api/clerk/route.js - CORRIGÉ POUR VERCEL
import mongoose from "mongoose"

export const dynamic = 'force-dynamic'

// Connexion MongoDB avec timeout pour Vercel
async function connectDB() {
    if (mongoose.connection.readyState === 1) return true
    
    const uri = process.env.MONGODB_URI
    if (!uri) {
        console.error("❌ MONGODB_URI manquant sur Vercel")
        return false
    }
    
    try {
        // Configuration optimisée pour Vercel Serverless
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            maxPoolSize: 1, // Important pour Vercel Serverless
        })
        console.log("✅ MongoDB connected sur Vercel")
        return true
    } catch (error) {
        console.error("❌ MongoDB error sur Vercel:", error.message)
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
    createdAt: { type: Date, default: Date.now },
}, { minimize: false })

const User = mongoose.models.User || mongoose.model('User', userSchema)

export async function GET() {
    console.log("✅ Clerk GET verification request sur Vercel")
    
    return Response.json({
        service: "Clerk Webhook Receiver - Vercel",
        status: "active",
        url: "https://shop-flow-e-commerce.vercel.app/api/clerk",
        accepts: ["POST"],
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    })
}

export async function POST(request) {
    console.log("📨 Clerk webhook received sur Vercel")
    console.log("Vercel Region:", process.env.VERCEL_REGION)
    
    try {
        const payload = await request.json()
        console.log("Event type:", payload.type)
        console.log("User ID:", payload.data?.id)
        
        if (payload.type === 'user.created') {
            // GESTION AMÉLIORÉE DES EMAILS (pour tests Clerk)
            let email
            
            // Méthode 1: email_addresses array (normal)
            if (payload.data.email_addresses && payload.data.email_addresses.length > 0) {
                email = payload.data.email_addresses[0].email_address
                console.log("📧 Email from email_addresses:", email)
            }
            // Méthode 2: primary_email_address_id (test Clerk)
            else if (payload.data.primary_email_address_id) {
                email = `${payload.data.id}@clerk-test.com`
                console.log("⚠️ Test Clerk: using generated email:", email)
            }
            // Méthode 3: Fallback
            else {
                email = `user_${payload.data.id}@vercel-app.com`
                console.log("⚠️ No email found, using fallback:", email)
            }
            
            if (!email) {
                console.error("❌ Impossible to determine email")
                return Response.json({ 
                    success: false, 
                    error: "No email available",
                    data: payload.data
                }, { status: 400 })
            }
            
            // Connexion MongoDB
            const connected = await connectDB()
            if (!connected) {
                // En production, on peut quand même accepter le webhook
                console.log("⚠️ MongoDB failed but accepting webhook for Clerk")
                return Response.json({ 
                    success: true, 
                    warning: "User logged but MongoDB offline",
                    userId: payload.data.id,
                    email: email
                })
            }
            
            // Données utilisateur
            const userData = {
                clerkId: payload.data.id,
                email: email,
                name: `${payload.data.first_name || ''} ${payload.data.last_name || ''}`.trim() || 
                      email.split('@')[0] || 
                      "Clerk User",
                imageUrl: payload.data.image_url || payload.data.profile_image_url || '/default-avatar.png',
                cartItems: {},
                createdAt: new Date()
            }
            
            console.log("💾 Saving user to MongoDB Vercel:", {
                clerkId: userData.clerkId,
                email: userData.email,
                name: userData.name
            })
            
            // Sauvegarde avec gestion d'erreurs améliorée
            try {
                const user = await User.findOneAndUpdate(
                    { clerkId: payload.data.id },
                    userData,
                    { 
                        upsert: true, 
                        new: true,
                        setDefaultsOnInsert: true,
                        runValidators: true
                    }
                )
                
                console.log("✅ User saved successfully sur Vercel!")
                console.log("MongoDB ID:", user._id)
                
                return Response.json({ 
                    success: true,
                    message: "User saved to MongoDB",
                    user: {
                        id: user.clerkId,
                        email: user.email,
                        name: user.name,
                        mongoId: user._id.toString()
                    },
                    environment: "vercel",
                    timestamp: new Date().toISOString()
                })
                
            } catch (dbError) {
                // Gestion des erreurs MongoDB spécifiques
                if (dbError.code === 11000) {
                    console.log("⚠️ User already exists in MongoDB")
                    
                    // Récupérer l'utilisateur existant
                    const existingUser = await User.findOne({ clerkId: payload.data.id })
                    
                    return Response.json({ 
                        success: true, 
                        warning: "User already exists",
                        existing: existingUser ? {
                            email: existingUser.email,
                            createdAt: existingUser.createdAt
                        } : null,
                        userId: payload.data.id
                    })
                }
                
                console.error("❌ MongoDB save error:", dbError.message)
                
                // Même en cas d'erreur, on répond OK à Clerk
                return Response.json({ 
                    success: true, 
                    error: "User processed but MongoDB error",
                    details: dbError.message,
                    userId: payload.data.id
                })
            }
        }
        
        // Pour les autres types d'événements
        console.log("📝 Other event type:", payload.type)
        return Response.json({ 
            success: true,
            event: payload.type,
            message: "Event received"
        })
        
    } catch (error) {
        console.error("❌ Webhook processing error sur Vercel:", error.message)
        
        // IMPORTANT: Toujours répondre 200 à Clerk même en cas d'erreur
        // pour éviter les retries infinies
        return Response.json({ 
            success: true,  // Toujours true pour Clerk
            internalError: error.message,
            note: "Error handled internally, no retry needed",
            timestamp: new Date().toISOString()
        })
    }
}

// Fonction utilitaire pour extraire l'email
function extractEmail(userData) {
    // Essayez différentes méthodes
    const methods = [
        // Méthode 1: email_addresses array
        () => userData.email_addresses?.[0]?.email_address,
        
        // Méthode 2: primary_email_address
        () => userData.primary_email_address,
        
        // Méthode 3: email direct
        () => userData.email,
        
        // Méthode 4: username comme email
        () => userData.username ? `${userData.username}@clerk-user.com` : null,
        
        // Méthode 5: ID comme email
        () => `${userData.id}@clerk-user.com`
    ]
    
    for (const method of methods) {
        const email = method()
        if (email && email.includes('@')) {
            return email
        }
    }
    
    return null
}