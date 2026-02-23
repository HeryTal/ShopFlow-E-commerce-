import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request) {
    
    try {
        const {userId} = getAuth();
        await connectDB();
        const user = await User.findById(userId);
        const cartItems = user?.cartItems || {};
        return NextResponse.json({ success: true, cartItems });



}
    catch (error) {
        console.error("Error fetching cart items:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch cart items" }, { status: 500 });

    }
}
