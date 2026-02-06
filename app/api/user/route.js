import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/config/db';
import User from '@/models/User';

export async function GET() {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Check if user exists
        let user = await User.findById(userId);

        if (!user) {
            // If not, create user using Clerk data
            // Note: We need to get user data from Clerk
            // Since we can't directly access user object here, we'll create with minimal data
            // In a real scenario, you might need to use Clerk's API or webhooks
            // For now, assume we have the data or fetch from Clerk

            // This is a placeholder; in production, use Clerk's API to get user details
            const clerkUser = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
                },
            }).then(res => res.json());

            if (!clerkUser) {
                return NextResponse.json({ success: false, message: 'Failed to fetch user from Clerk' }, { status: 500 });
            }

            const userData = {
                _id: userId,
                email: clerkUser.email_addresses[0]?.email_address,
                name: `${clerkUser.first_name || ''} ${clerkUser.last_name || ''}`.trim(),
                imageUrl: clerkUser.image_url || '/default-avatar.png',
                cartItems: {},
            };

            user = await User.create(userData);
        }

        return NextResponse.json({ success: true, user });

    } catch (error) {
        console.error('Error fetching/creating user:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
