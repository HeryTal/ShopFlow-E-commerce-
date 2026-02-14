import { auth } from "@clerk/nextjs/server"
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
            const cookieMap = Object.fromEntries(
                cookiePairs
                    .map((c) => {
                        const idx = c.indexOf("=");
                        if (idx === -1) return null;
                        return [c.slice(0, idx), c.slice(idx + 1)];
                    })
                    .filter(Boolean)
            );
            let sessionToken = cookieMap.__session || "";
            if (!sessionToken) {
                const sessionKey = Object.keys(cookieMap).find((k) =>
                    k.startsWith("__session_")
                );
                if (sessionKey) sessionToken = cookieMap[sessionKey];
            }
            let tokenIss;
            let tokenExp;
            if (sessionToken) {
                const parts = sessionToken.split(".");
                if (parts.length >= 2) {
                    try {
                        const payload = JSON.parse(
                            Buffer.from(parts[1], "base64url").toString("utf8")
                        );
                        tokenIss = payload?.iss;
                        tokenExp = payload?.exp
                            ? new Date(payload.exp * 1000).toISOString()
                            : undefined;
                    } catch {}
                }
            }
            console.log("Clerk auth debug:", {
                pkPrefix: pk.slice(0, 8),
                pkSuffix: pk.slice(-4),
                pkLen: pk.length,
                skPrefix: sk.slice(0, 8),
                skSuffix: sk.slice(-4),
                skLen: sk.length,
                hasCookie: cookieHeader.length > 0,
                cookieNames,
                tokenIss,
                tokenExp,
                host: request.headers.get("host"),
                referer: request.headers.get("referer"),
            });
        }
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
} catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });   
}
}
