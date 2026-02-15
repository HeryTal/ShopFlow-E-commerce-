import mongoose from "mongoose";
import User from "@/models/User";

export const dynamic = "force-dynamic";

async function connectDB() {
  if (mongoose.connection.readyState === 1) return true;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI missing");
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 1,
    });
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    return false;
  }
}

const resolveEmail = (payloadData) => {
  if (Array.isArray(payloadData?.email_addresses) && payloadData.email_addresses.length > 0) {
    const fromList = payloadData.email_addresses.find((e) => e?.email_address)?.email_address;
    if (fromList) return fromList;
  }

  if (payloadData?.primary_email_address) return payloadData.primary_email_address;

  if (payloadData?.id) return `${payloadData.id}@clerk-oauth-user.com`;

  return null;
};

export async function GET() {
  return Response.json({
    service: "Clerk Webhook Receiver",
    status: "active",
    accepts: ["POST"],
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request) {
  try {
    const payload = await request.json();

    if (payload?.type !== "user.created" && payload?.type !== "user.updated") {
      return Response.json({ success: true, event: payload?.type || "unknown" });
    }

    const payloadData = payload?.data || {};
    const email = resolveEmail(payloadData);

    if (!email || !payloadData?.id) {
      return Response.json({
        success: false,
        message: "Invalid Clerk payload",
      }, { status: 400 });
    }

    const connected = await connectDB();
    if (!connected) {
      return Response.json({
        success: true,
        warning: "MongoDB unavailable, webhook accepted",
      });
    }

    const userData = {
      clerkId: payloadData.id,
      email,
      name:
        `${payloadData.first_name || ""} ${payloadData.last_name || ""}`.trim() ||
        email.split("@")[0] ||
        "Clerk User",
      imageUrl: payloadData.image_url || payloadData.profile_image_url || "/default-avatar.png",
      role: "seller",
      cartItems: {},
    };

    const user = await User.findOneAndUpdate(
      { clerkId: payloadData.id },
      { $set: userData },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
    );

    return Response.json({
      success: true,
      message: "User synced",
      user: {
        id: user.clerkId,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Webhook processing error:", error.message);

    return Response.json({
      success: true,
      internalError: error.message,
    });
  }
}
