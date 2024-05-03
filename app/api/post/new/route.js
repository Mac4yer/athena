import { connectToDB } from "@lib/mongodb/mongoose"
import { writeFile } from "fs/promises"; // Import writeFile from fs promises
import Post from "@lib/models/Post";
import User from "@lib/models/User";

export const POST = async (req) => {

    const path = require('path');
    const currentWorkingDirectory = process.cwd();

    try {

        await connectToDB();

        const data = await req.formData();

        let postPhoto = data.get('postPhoto');

        const bytes = await postPhoto.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const postPhotoPath = path.join(
            currentWorkingDirectory,
            'public',
            'uploads',
            postPhoto.name
        );

        await writeFile(postPhotoPath, buffer);

        postPhoto = `/uploads/${postPhoto.name}`;

        const newPost = await Post.create({
            creator: data.get('creatorId'),
            caption: data.get('caption'),
            tag: data.get('tag'),
            postPhoto: postPhoto
        });

        await newPost.save();

        // Update the user's posts array
        await User.findByIdAndUpdate(
            data.get("creatorId"),
            { $push: { posts: newPost._id } },
            { new: true, useFindAndModify: false }
        );

        return new Response(JSON.stringify(newPost), {
            status: 200
        });

    } catch (error) {
        console.error(error)
        return new Response('Fail create a new post', {
            status: 500
        });
    }

}