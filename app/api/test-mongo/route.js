// app/api/test-mongo/route.js
import mongoose from 'mongoose'

export const dynamic = 'force-dynamic'

export async function GET() {
    console.log("🧪 Testing MongoDB connection on Vercel...")
    
    const uri = process.env.MONGODB_URI
    
    if (!uri) {
        return Response.json({
            success: false,
            error: "MONGODB_URI not set",
            env: Object.keys(process.env).filter(k => k.includes('MONGO'))
        }, { status: 500 })
    }
    
    console.log("URI exists:", !!uri)
    console.log("URI start:", uri.substring(0, 50))
    
    try {
        // Essayez avec différentes configurations
        const options = {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            maxPoolSize: 1,
        }
        
        await mongoose.connect(uri, options)
        
        const db = mongoose.connection
        const collections = await db.db.listCollections().toArray()
        
        return Response.json({
            success: true,
            message: "MongoDB connected successfully on Vercel",
            database: db.name,
            collections: collections.map(c => c.name),
            readyState: db.readyState,
            host: db.host
        })
        
    } catch (error) {
        console.error("❌ MongoDB test error:", error.message)
        
        return Response.json({
            success: false,
            error: error.message,
            code: error.code,
            name: error.name,
            uri: uri.substring(0, 80) + "..."
        }, { status: 500 })
    }
}