// scripts/test-mongo.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Charge les variables d'environnement
dotenv.config({ path: '.env' });

async function testMongoDB() {
    console.log("=== TEST CONNEXION MONGODB ===\n");
    
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
        console.log("❌ MONGODB_URI non trouvé dans .env.local");
        console.log("💡 Ajoute: MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/");
        return;
    }
    
    console.log("🔍 URI détectée (masquée):");
    const maskedURI = MONGODB_URI.replace(
        /\/\/([^:]+):([^@]+)@/,
        '//***:***@'
    );
    console.log(`   ${maskedURI}\n`);
    
    console.log("🔄 Tentative de connexion...");
    
    try {
        // Options de connexion
        const options = {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };
        
        await mongoose.connect(`${MONGODB_URI}/E-commerce`, options);
        
        console.log("✅ CONNEXION RÉUSSIE !\n");
        
        // Infos sur la connexion
        const conn = mongoose.connection;
        console.log("📊 Informations connexion:");
        console.log(`   Base de données: ${conn.name}`);
        console.log(`   Host: ${conn.host}`);
        console.log(`   Port: ${conn.port}`);
        console.log(`   État: ${conn.readyState === 1 ? 'Connecté 🟢' : 'Non connecté 🔴'}`);
        
        // Liste les collections
        const collections = await conn.db.listCollections().toArray();
        console.log(`\n📁 Collections (${collections.length}):`);
        collections.forEach(col => {
            console.log(`   - ${col.name}`);
        });
        
        // Ferme la connexion
        await mongoose.disconnect();
        console.log("\n👋 Connexion fermée");
        
    } catch (error) {
        console.error("\n❌ ÉCHEC DE CONNEXION");
        console.error(`   Message: ${error.message}`);
        console.error(`   Code: ${error.code || 'N/A'}`);
        
        console.log("\n🔍 Dépannage:");
        console.log("1. Vérifie ton nom d'utilisateur/mot de passe");
        console.log("2. Va sur MongoDB Atlas → Network Access");
        console.log("3. Ajoute ton adresse IP actuelle (ou 0.0.0.0/0)");
        console.log("4. Vérifie que ton cluster est actif");
        
        // Test de ping pour voir si le host est accessible
        console.log("\n🌐 Test de ping réseau...");
        const host = MONGODB_URI.match(/@([^/]+)/)?.[1];
        if (host) {
            console.log(`   Host MongoDB: ${host}`);
            // Tu peux essayer de ping manuellement ce host
        }
    }
}

testMongoDB();