import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Products from "@/models/Product";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});


export const POST = async (req) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
        }

        const isSeller = await authSeller(userId);
        if (!isSeller) {
            return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
        }

        const formData = await req.formData();
        const name = formData.get("name");
        const description = formData.get("description");
        const category = formData.get("category");
        const price = formData.get("price");
        const offerPrice = formData.get("offerPrice");
        const files = formData.getAll("images");

        if (!files || files.length === 0) {
            return new Response(JSON.stringify({ success: false, message: "No images provided" }), { status: 400 });
        }

        const results = await Promise.all(
            files.map(async (file) => {
                const buffer = Buffer.from(await file.arrayBuffer());
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: "quickcart/products" },
                        (error, result) => {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(result);
                        }
                    );
                    stream.end(buffer);
                });
            })
        );

        const images = results.map((result) => result.secure_url);

        await connectDB();
        const newProduct = await Products.create({
            name,
            description,
            category,
            price,
            offerPrice,
            images,
            userId,
        });

        return new Response(JSON.stringify({ success: true, product: newProduct }), { status: 201 });
    } catch (error) {
        console.error("Error uploading images:", error);
        return new Response(JSON.stringify({ success: false, message: "Failed to add product" }), { status: 500 });
    }
};
