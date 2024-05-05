'use client'

import { useUser } from '@clerk/nextjs'
import Loader from '@components/Loader'
import UserCard from '@components/cards/UserCard'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const People = () => {

    const { user, isLoaded } = useUser()

    const router = useRouter()

    const [loading, setLoading] = useState(true)

    const [allUser, setAllUser] = useState([])

    if (!user) {
        router.push('/sign-in')
    }

    const getAllUser = async () => {
        const response = await fetch(`/api/user`)
        const data = await response.json()
        setAllUser(data)
        setLoading(false)
    }

    useEffect(() => {
        getAllUser()
    }, [])
    
  return loading ? <Loader /> : (
    <div className='flex flex-col gap-4 py-6'>
        {allUser?.map((user) => (
            <UserCard key={user.id} userData={user} update={getAllUser} />
        ))}
    </div>
  )
}

export default People