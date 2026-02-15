import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Products from "@/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Products.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch products" }, { status: 500 });
  }
}
 
