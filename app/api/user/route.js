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
            // If not, create user using Clerk currentUser
            const clerkUser = await currentUser();

            if (!clerkUser) {
                return NextResponse.json({ success: false, message: 'Failed to get user from Clerk' }, { status: 500 });
            }

            const userData = {
                _id: userId,
                email: clerkUser.emailAddresses?.[0]?.emailAddress || clerkUser.primaryEmailAddressId || 'no-email@example.com',
                name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || 'User',
                imageUrl: clerkUser.imageUrl || clerkUser.profileImageUrl || '/default-avatar.png',
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
