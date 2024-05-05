import User from "@lib/models/User";
import { connectToDB } from "@lib/mongodb/mongoose"

export const GET = async (req) => {

    try {

        await connectToDB();

        const allUser = await User.find().populate('posts savedPosts likedPosts followers following').exec();

        return new Response(JSON.stringify(allUser), { status: 200 });
        
    } catch (error) {
        console.log(error);
        return new Response('Failed to get all user', { status: 500 });
    }

}