import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
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
            // If not, create user using Clerk API
            const clerkApiUrl = `https://api.clerk.com/v1/users/${userId}`;
            const response = await fetch(clerkApiUrl, {
                headers: {
                    Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error('Failed to fetch user from Clerk API:', response.status, response.statusText);
                return NextResponse.json({ success: false, message: 'Failed to fetch user from Clerk' }, { status: 500 });
            }

            const clerkUser = await response.json();
            console.log('Clerk user data:', clerkUser);

            const userData = {
                _id: userId,
                email: clerkUser.email_addresses?.[0]?.email_address || clerkUser.primary_email_address_id || 'no-email@example.com',
                name: clerkUser.first_name && clerkUser.last_name
                    ? `${clerkUser.first_name} ${clerkUser.last_name}`.trim()
                    : clerkUser.username || clerkUser.full_name || 'User',
                imageUrl: clerkUser.image_url || clerkUser.profile_image_url || '/default-avatar.png',
                cartItems: {},
            };

            user = await User.create(userData);
            console.log('User created in DB:', user);
        }

        return NextResponse.json({ success: true, user });

    } catch (error) {
        console.error('Error fetching/creating user:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
