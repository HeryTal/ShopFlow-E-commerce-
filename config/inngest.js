// /config/inngest.js - Version corrigée
import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

export const inngest = new Inngest({ 
  id: "e-commerce",
  eventKey: process.env.INNGEST_EVENT_KEY || "test-key"
});

// Cache pour la connexion DB
let dbConnected = false;

async function ensureDBConnection() {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
}

// Fonction pour synchroniser la création d'utilisateur
export const syncUserCreation = inngest.createFunction(
  { 
    id: 'sync-user-from-clerk',
    name: 'Sync User from Clerk' 
  },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    console.log("🔄 Sync création utilisateur:", event.data.id);
    
    try {
      await ensureDBConnection();
      
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      
      if (!email_addresses || email_addresses.length === 0) {
        console.error("❌ Aucun email trouvé");
        return { success: false, error: "No email" };
      }
      
      // Trouver l'email principal
      const primaryEmailObj = email_addresses.find(
        email => email.id === event.data.primary_email_address_id
      ) || email_addresses[0];
      
      const userData = {
        clerkId: id,
        email: primaryEmailObj.email_address,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        imageUrl: image_url || '/default-avatar.png',
        cartItems: {},
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const user = await User.findOneAndUpdate(
        { clerkId: id },
        userData,
        { 
          upsert: true, 
          new: true,
          setDefaultsOnInsert: true 
        }
      );
      
      console.log("✅ Utilisateur synchronisé:", user.clerkId);
      return { success: true, userId: user.clerkId };
      
    } catch (error) {
      console.error("❌ Erreur synchronisation utilisateur:", error);
      return { success: false, error: error.message };
    }
  }
);

// Fonction pour mettre à jour l'utilisateur
export const syncUserUpdate = inngest.createFunction(
  { 
    id: 'sync-user-update-from-clerk',
    name: 'Sync User Update from Clerk' 
  },
  { event: 'clerk/user.updated' },
  async ({ event }) => {
    console.log("🔄 Sync mise à jour utilisateur:", event.data.id);
    
    try {
      await ensureDBConnection();
      
      const { id, first_name, last_name, image_url } = event.data;
      
      const updateData = {
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        imageUrl: image_url,
        updatedAt: new Date()
      };
      
      const updatedUser = await User.findOneAndUpdate(
        { clerkId: id },
        updateData, 
        { new: true }
      );
      
      if (!updatedUser) {
        console.warn("⚠️ Utilisateur non trouvé pour mise à jour");
        return { success: false, error: "User not found" };
      }
      
      console.log("✅ Utilisateur mis à jour:", updatedUser.clerkId);
      return { success: true, user: updatedUser };
      
    } catch (error) {
      console.error("❌ Erreur mise à jour utilisateur:", error);
      return { success: false, error: error.message };
    }
  }
);

// Fonction pour supprimer l'utilisateur
export const syncUserDeletion = inngest.createFunction(
  { 
    id: 'sync-user-deletion-from-clerk',
    name: 'Sync User Deletion from Clerk' 
  },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    console.log("🔄 Sync suppression utilisateur:", event.data.id);
    
    try {
      await ensureDBConnection();
      
      const { id } = event.data;
      const deletedUser = await User.findOneAndDelete({ clerkId: id });
      
      if (!deletedUser) {
        console.warn("⚠️ Utilisateur non trouvé pour suppression");
        return { success: false, error: "User not found" };
      }
      
      console.log("✅ Utilisateur supprimé:", id);
      return { success: true, deleted: true };
      
    } catch (error) {
      console.error("❌ Erreur suppression utilisateur:", error);
      return { success: false, error: error.message };
    }
  }
);