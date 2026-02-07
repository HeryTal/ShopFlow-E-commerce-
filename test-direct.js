// test-direct.js
const { MongoClient } = require('mongodb')

async function test() {
    const uri = "mongodb+srv://jocelynraherinirina:jocelyn2710@shopwflow.eauzs19.mongodb.net/shopFlow?retryWrites=true&w=majority"
    
    console.log("Testing direct MongoDB connection...")
    
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
    
    try {
        await client.connect()
        console.log("✅ Connected successfully!")
        
        const db = client.db('shopFlow')
        const collections = await db.listCollections().toArray()
        console.log("Collections:", collections.map(c => c.name))
        
    } catch (error) {
        console.error("❌ Connection failed:", error.message)
    } finally {
        await client.close()
    }
}

test()