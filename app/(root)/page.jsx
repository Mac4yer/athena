'use client'

import { useUser } from '@clerk/nextjs'
import Loader from '@components/Loader'
import PostCard from '@components/cards/PostCard'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Home = () => {
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [feedPost, setFeedPost] = useState([])

    const getFeedPost = async () => {
        const response = await fetch('/api/post')
        const data = await response.json()
        setFeedPost(data)
        setLoading(false)
    }

    useEffect(() => {
        getFeedPost()
    }, [])

    if (loading || !isLoaded) {
        return <Loader />
    }

    return (
        <div className='flex flex-col gap-10'>
            {feedPost.map((post) => {
                if (!post.creator || !post.creator.id) {
                    if (user) {

                        return (

                            <PostCard key={post._id} post={post} creator={post.creator} loggedInUser={user} update={getFeedPost} />

                        )

                    } else {

                        router.push('/sign-in')

                    }
                    return null
                }
            })}
        </div>
    )
}

export default Home;
