import connectDB from "@/config/db";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const user = await User.findOne({ clerkId: userId });
        const cartItems = user?.cartItems || {};

        return NextResponse.json({ success: true, cartItems });

    } catch (error) {
        console.error("Error fetching cart item:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch cart item" }, { status: 500 });
    }
}
