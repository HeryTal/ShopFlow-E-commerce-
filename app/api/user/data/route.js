import { auth, currentUser } from "@clerk/nextjs/server"
import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        if (process.env.NODE_ENV !== "production") {
            const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
            const sk = process.env.CLERK_SECRET_KEY || "";
            const cookieHeader = request.headers.get("cookie") || "";
            const cookiePairs = cookieHeader.split(";").map((c) => c.trim());
            const cookieNames = cookiePairs
                .map((c) => c.split("=")[0])
                .filter(Boolean);

            console.log("Clerk auth debug:", {
                pkPrefix: pk.slice(0, 8),
                pkSuffix: pk.slice(-4),
                pkLen: pk.length,
                skPrefix: sk.slice(0, 8),
                skSuffix: sk.slice(-4),
                skLen: sk.length,
                hasCookie: cookieHeader.length > 0,
                cookieNames,
                host: request.headers.get("host"),
                referer: request.headers.get("referer"),
            });
        }

        const { userId, sessionClaims } = await auth();
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        let user = await User.findOne({ clerkId: userId });
        const clerkUser = await currentUser();
        const resolvedRole =
            clerkUser?.publicMetadata?.role ||
            sessionClaims?.metadata?.role ||
            sessionClaims?.public_metadata?.role ||
            user?.role ||
            "user";

        // Backward compatibility: older records may have a string _id equal to clerk user id.
        // Use the native collection to avoid Mongoose ObjectId casting errors.
        if (!user) {
            const legacyUser = await User.collection.findOne({ _id: userId });
            if (legacyUser) {
                await User.collection.updateOne(
                    { _id: userId },
                    { $set: { clerkId: userId } }
                );
                user = await User.findOne({ clerkId: userId });
            }
        }

        if (!user) {
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
            const imageUrl = clerkUser?.imageUrl || "/default-avatar.png";

            user = await User.findOneAndUpdate(
                { $or: [{ clerkId: userId }, { email: primaryEmail }] },
                {
                    clerkId: userId,
                    email: primaryEmail,
                    name: displayName,
                    imageUrl,
                    role: resolvedRole,
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }
        
        if (user && user.role !== resolvedRole) {
            user.role = resolvedRole;
            await user.save();
        }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ success: false, message: "Failed to fetch user" }, { status: 500 });
    }
}
