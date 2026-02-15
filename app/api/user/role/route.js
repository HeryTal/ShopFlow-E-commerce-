import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";

const ALLOWED_ROLES = new Set(["user", "seller"]);
const normalizeRole = (role) => String(role || "").trim().toLowerCase();

export async function POST(request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json().catch(() => ({}));
        const role = normalizeRole(body?.role);

        if (!ALLOWED_ROLES.has(role)) {
            return NextResponse.json(
                { success: false, message: "Invalid role. Allowed: user, seller" },
                { status: 400 }
            );
        }

        await connectDB();

        const user = await User.findOneAndUpdate(
            { clerkId: userId },
            { $set: { role } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        // Keep Clerk metadata in sync so client-side checks update after re-auth.
        try {
            const client = await clerkClient();
            await client.users.updateUserMetadata(userId, {
                publicMetadata: { role },
            });
        } catch (syncError) {
            console.error("Failed to sync role to Clerk metadata:", syncError.message);
        }

        return NextResponse.json({
            success: true,
            message: "Role updated",
            user: {
                clerkId: user.clerkId,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Role update error:", error);
        return NextResponse.json({ success: false, message: "Failed to update role" }, { status: 500 });
    }
}
