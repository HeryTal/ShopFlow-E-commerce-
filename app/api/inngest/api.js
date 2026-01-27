import { serve } from "inngest/next"
import { 
    inngest, 
    syncUserCreation, 
    syncUserUpdate, 
    syncUserDeletion 
} from "@/config/inngest"

// Crée le handler
export const { GET, POST } = serve({
    client: inngest,
    functions: [
        syncUserCreation,
        syncUserUpdate,
        syncUserDeletion
    ],
})