// app/api/inngest/route.js - VERSION BASIQUE
import { serve } from "inngest/next"
import { inngest } from "@/config/inngest"

// Importez les fonctions directement, PAS comme paramètres
import { syncUserCreation } from "@/config/inngest"
import { syncUserUpdate } from "@/config/inngest" 
import { syncUserDeletion } from "@/config/inngest"

console.log("🔧 Initializing Inngest endpoint...")

// Créez le handler SIMPLE
const handler = serve({ 
    client: inngest,
    functions: [],
})

// Ajoutez manuellement les fonctions
handler.functions = [syncUserCreation, syncUserUpdate, syncUserDeletion]

export const { GET, POST, PUT } = handler