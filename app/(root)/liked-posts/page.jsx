"use client";

import { useUser } from '@clerk/nextjs'
import Loader from '@components/Loader'
import PostCard from '@components/cards/PostCard'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

const LikedPosts = () => {

  const { user, isLoaded } = useUser()

  const router = useRouter()

  const [loading, setLoading] = useState(true)

  const [userData, setUserData] = useState({})

  if (!user) {
    router.push('/sign-in')
  }

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`)
    const data = await response.json()
    setUserData(data)
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

  return loading || !isLoaded ? <Loader /> : (
    <div className='flex flex-col gap-9'>
      {userData?.likedPosts?.map((post) => (
        <PostCard key={post._id} post={post} creator={post.creator} loggedInUser={user} update={getUser} />
      ))}
    </div>
  )
}

export default LikedPosts