// config/db.js - CORRIGÉ
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
        
        // VOTRE URI DÉJÀ CONTIENT LE NOM DE LA BASE (shopFlow)
        // Ne pas ajouter de base supplémentaire
        const connectionString = MONGODB_URI
        
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