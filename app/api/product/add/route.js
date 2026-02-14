import {v2 as cloudinary} from 'cloudinary'
import {Inngest} from 'inngest'
import {addProduct} from '@/lib/db/product'
import {getUser} from '@/lib/db/user'
import {getSession} from '@/lib/auth/session'
import { getAuth } from '@clerk/nextjs/dist/types/server'
import authSeller from '@/lib/authSeller'
import Products from '@/models/Product'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})


export const POST = async (req) => {

    try {
        const {userId} = getAuth(req)
        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return new Response(JSON.stringify({success: false, message: "Unauthorized"}), {status: 401})
        }
        const formData = await req.formData()
        const name = formData.get('name')
        const description = formData.get('description')
        const category = formData.get('category')
        const price = formData.get('price')
        const offerPrice = formData.get('offerPrice')
const files = formData.getAll('images');


        if (!files || files.length === 0) {
            return new Response(JSON.stringify({ success: false, message: "No images provided" }), { status: 400 });
        }

        const results = await Promise.all(files.map(file => {
        const arrayBuffer = file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ folder: 'quickcart/products' }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }});
            stream.end(buffer);
        });
        
    }))
    const image = results.map(result => result.secure_url)

    await connectDB()
    const newProduct = await Products({name, description, category, price, offerPrice, images: image, userId})
    return new Response(JSON.stringify({success: true, product: newProduct}), {status: 201})


}
    catch (error) {
        console.error("Error uploading images:", error);
    }
}