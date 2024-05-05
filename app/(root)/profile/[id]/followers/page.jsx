'use client'

import Loader from '@components/Loader'
import UserCard from '@components/cards/UserCard'
import ProfileCard from '@components/cards/ProfileCard'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

const Followers = () => {

  const { id } = useParams()
  const { user } = useUser()

  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({})

  const getUser = async () => {

    const response = await fetch(`/api/user/profile/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json()
    setUserData(data)
    setLoading(false)
  }

  useEffect(() => {
    getUser()
  }, [id])

  return loading ? <Loader /> : (
    <div className='flex flex-col gap-9'>
      <ProfileCard userData={userData} activeTab='Followers' />

      <div className='flex flex-col gap-9'>
        {userData?.followers?.map((person) => (
          user ? (
            <UserCard key={person._id} userData={person} update={getUser} />
          ) : (
            router.push('/sign-in')
          )
        ))}
      </div>
    </div>
  )
}

export default Followers