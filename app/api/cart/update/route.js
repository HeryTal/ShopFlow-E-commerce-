import { auth, currentUser } from "@clerk/nextjs/server";
import User from "@/models/User";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";

const isObject = (value) => value && typeof value === "object" && !Array.isArray(value);

export async function POST(request) {
    try {
        const { userId, sessionClaims } = await auth();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json().catch(() => ({}));
        const cartData = isObject(body?.cartData) ? body.cartData : {};

        await connectDB();

        let user = await User.findOne({ clerkId: userId });

        // Create a DB user lazily to avoid cart update failures on first login.
        if (!user) {
            const clerkUser = await currentUser();
            const primaryEmail =
                clerkUser?.emailAddresses?.find((email) => email.id === clerkUser.primaryEmailAddressId)?.emailAddress ||
                clerkUser?.emailAddresses?.[0]?.emailAddress ||
                sessionClaims?.email ||
                `${userId}@clerk.local`;
            const displayName =
                [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") ||
                sessionClaims?.fullName ||
                sessionClaims?.username ||
                primaryEmail.split("@")[0] ||
                "User";

            user = await User.create({
                clerkId: userId,
                email: primaryEmail,
                name: displayName,
                imageUrl: clerkUser?.imageUrl || "/default-avatar.png",
                cartItems: cartData,
            });
        } else {
            user.cartItems = cartData;
            await user.save();
        }

        return NextResponse.json({ success: true, cartItems: user.cartItems || {} });
    } catch (error) {
        console.error("update error:", error);
        return NextResponse.json({ success: false, message: "Failed to update cart" }, { status: 500 });
    }
}
