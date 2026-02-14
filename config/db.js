import mongoose from "mongoose"

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const MONGODB_URI = process.env.MONGODB_URI

        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined")
        }

        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts)
            .then((mongooseInstance) => {
                console.log("MongoDB connected:", mongooseInstance.connection.name)
                return mongooseInstance
            })
            .catch((error) => {
                cached.promise = null
                throw error
            })
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB
