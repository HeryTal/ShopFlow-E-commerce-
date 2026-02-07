// app/api/clerk/route.js
export const dynamic = 'force-dynamic'

export async function POST(request) {
    console.log("📨 Clerk webhook received")
    
    try {
        const payload = await request.json()
        console.log("Event type:", payload.type)
        console.log("User ID:", payload.data?.id)
        
        // Traiter seulement la création d'utilisateur
        if (payload.type === 'user.created') {
            const userData = {
                clerkId: payload.data.id,
                email: payload.data.email_addresses[0]?.email_address,
                name: `${payload.data.first_name || ''} ${payload.data.last_name || ''}`.trim(),
                imageUrl: payload.data.image_url || '/default-avatar.png',
                cartItems: {}
            }
            
            console.log("💾 Saving user:", userData.email)
            
            // Envoyer à votre serveur sync (doit tourner sur port 3001)
            const response = await fetch('http://localhost:3001/sync-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })
            
            const result = await response.json()
            console.log("✅ Sync result:", result)
        }
        
        // Toujours répondre OK à Clerk
        return Response.json({ success: true })
        
    } catch (error) {
        console.error("❌ Webhook error:", error.message)
        // Même en cas d'erreur, répondre OK pour éviter les retries
        return Response.json({ success: true, note: "error handled internally" })
    }
}