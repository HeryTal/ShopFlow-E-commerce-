import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Products from "@/models/Product";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const products = await Products.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching seller products:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch products" }, { status: 500 });
  }
}
