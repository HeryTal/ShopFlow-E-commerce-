// sync-server.js (à la racine)
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ MongoDB erreur:', err))

// Modèle User
const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    cartItems: { type: Object, default: {} },
}, { minimize: false })

const User = mongoose.model('User', userSchema)

// Endpoint sync
app.post('/sync-user', async (req, res) => {
    console.log('🔄 Syncing user:', req.body.email)
    
    try {
        const user = await User.findOneAndUpdate(
            { clerkId: req.body.clerkId },
            req.body,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        )
        
        console.log('✅ User saved:', user.email)
        res.json({ success: true, user })
        
    } catch (error) {
        console.error('❌ Sync error:', error.message)
        res.status(500).json({ error: error.message })
    }
})

// Test
app.get('/users', async (req, res) => {
    const users = await User.find({}, 'clerkId email name')
    res.json({ count: users.length, users })
})

app.listen(3001, () => {
    console.log('🚀 Sync Server: http://localhost:3000')
    console.log('📝 POST /sync-user - Sync user from Clerk')
    console.log('📝 GET  /users      - List all users')
})