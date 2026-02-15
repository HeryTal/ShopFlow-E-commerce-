import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    imageUrl: { type: String, default: "/default-avatar.png" },
    role: { type: String, default: "seller" },
    cartItems: { type: Object, default: {} },
}, { minimize: false, timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
