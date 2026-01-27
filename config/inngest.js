import { Inngest } from "inngest"
import connectDB from "./db"
import User from "@/models/User"

// Initialise Inngest avec la clé d'événement
export const inngest = new Inngest({ 
    id: "e-commerce",
    eventKey: process.env.INNGEST_EVENT_KEY
})

// Fonction pour synchroniser la création d'utilisateur
export const syncUserCreation = inngest.createFunction(
    { 
        id: 'sync-user-from-clerk',
        name: 'Sync User from Clerk' 
    },
    { event: 'clerk/user.created' },
    async({ event }) => {
        console.log("🔄 Sync création utilisateur:", event.data.id)
        
        try {
            const { id, first_name, last_name, email_addresses, image_url } = event.data
            
            // Validation
            if (!email_addresses || email_addresses.length === 0) {
                console.error("❌ Aucun email trouvé")
                return { success: false, error: "No email" }
            }
            
            const userData = {
                _id: id,
                email: email_addresses[0].email_address, // CORRECTION: . pas ,
                name: `${first_name || ''} ${last_name || ''}`.trim(),
                imageUrl: image_url || '/default-avatar.png',
                cartItems: {},
                createdAt: new Date(),
                updatedAt: new Date()
            }
            
            console.log("📝 Données utilisateur:", userData)
            
            await connectDB()
            const user = await User.create(userData)
            
            console.log("✅ Utilisateur créé:", user._id)
            return { success: true, userId: id }
            
        } catch (error) {
            console.error("❌ Erreur création utilisateur:", error.message)
            
            // Si l'utilisateur existe déjà (erreur de duplication)
            if (error.code === 11000) {
                console.log("⚠️ Utilisateur existe déjà, mise à jour...")
                try {
                    await connectDB()
                    const updatedUser = await User.findByIdAndUpdate(
                        event.data.id,
                        {
                            name: `${event.data.first_name || ''} ${event.data.last_name || ''}`.trim(),
                            imageUrl: event.data.image_url,
                            updatedAt: new Date()
                        },
                        { new: true }
                    )
                    return { success: true, updated: true, userId: event.data.id }
                } catch (updateError) {
                    console.error("❌ Erreur mise à jour:", updateError.message)
                    return { success: false, error: updateError.message }
                }
            }
            
            return { success: false, error: error.message }
        }
    }
)

// Fonction pour mettre à jour l'utilisateur
export const syncUserUpdate = inngest.createFunction(
    { 
        id: 'sync-user-update-from-clerk',
        name: 'Sync User Update from Clerk' 
    },
    { event: 'clerk/user.updated' },
    async({ event }) => {
        console.log("🔄 Sync mise à jour utilisateur:", event.data.id)
        
        try {
            const { id, first_name, last_name, email_addresses, image_url } = event.data
            
            const updateData = {
                name: `${first_name || ''} ${last_name || ''}`.trim(),
                imageUrl: image_url,
                updatedAt: new Date()
            }
            
            console.log(" Données de mise à jour:", updateData)
            
            await connectDB()
            const updatedUser = await User.findByIdAndUpdate(
                id, 
                updateData, 
                { new: true, runValidators: true }
            )
            
            if (!updatedUser) {
                console.warn(" Utilisateur non trouvé pour mise à jour")
                return { success: false, error: "User not found" }
            }
            
            console.log(" Utilisateur mis à jour:", updatedUser._id)
            return { success: true, user: updatedUser }
            
        } catch (error) {
            console.error(" Erreur mise à jour utilisateur:", error.message)
            return { success: false, error: error.message }
        }
    }
)

// Fonction pour supprimer l'utilisateur
export const syncUserDeletion = inngest.createFunction(
    { 
        id: 'sync-user-deletion-from-clerk',
        name: 'Sync User Deletion from Clerk' 
    },
    { event: 'clerk/user.deleted' },
    async({ event }) => {
        console.log("🔄 Sync suppression utilisateur:", event.data.id)
        
        try {
            const { id } = event.data
            
            await connectDB()
            const deletedUser = await User.findByIdAndDelete(id)
            
            if (!deletedUser) {
                console.warn(" Utilisateur non trouvé pour suppression")
                return { success: false, error: "User not found" }
            }
            
            console.log(" Utilisateur supprimé:", id)
            return { success: true, deleted: true }
            
        } catch (error) {
            console.error(" Erreur suppression utilisateur:", error.message)
            return { success: false, error: error.message }
        }
    }
)