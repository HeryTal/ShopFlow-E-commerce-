import mongoose from "mongoose"

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
    console.log("🔍 Tentative connexion MongoDB...")
    
    if (cached.conn) {
        console.log("✅ Utilisation connexion existante")
        return cached.conn
    }
    
    if (!cached.promise) {
        const MONGODB_URI = process.env.MONGODB_URI
        
        if (!MONGODB_URI) {
            console.error("❌ MONGODB_URI non défini")
            throw new Error("MONGODB_URI manquant dans .env")
        }
        
        console.log(`📝 URI: ${MONGODB_URI.substring(0, 60)}...`)
        
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,
        }
        
        // Note: Ton URI a déjà le nom de la base? Vérifie si /E-commerce est nécessaire
        const connectionString = MONGODB_URI.includes('?') 
            ? MONGODB_URI.replace('?', '/ShopwFlow?') 
            : `${MONGODB_URI}/ShopwFlow`
        
        console.log(`🔗 Connexion à: ${connectionString.substring(0, 80)}...`)
        
        cached.promise = mongoose.connect(connectionString, opts)
            .then((mongoose) => {
                console.log("✅ MongoDB connecté!")
                console.log(`📁 DB: ${mongoose.connection.name}`)
                return mongoose
            })
            .catch((error) => {
                console.error("❌ Erreur connexion MongoDB:", error.message)
                cached.promise = null
                throw error
            })
    }
    
    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB