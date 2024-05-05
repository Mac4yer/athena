'use client'

import Loader from '@components/Loader'
import UserCard from '@components/cards/UserCard'
import React, { useEffect, useState } from 'react'

function RightSideBar() {

  const [loading, setLoading] = useState(true)

  const [allUser, setAllUser] = useState([])

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
    <div className='sticky top-0 right-0 z-20 h-screen w=[30px xl:w-[350px] flex flex-col gap-12 overflow-auto pl-6 pr-10 py-6 max-lg:hidden'>
      <div className='flex flex-col gap-4'>
        <h3 className='text-light-1 text-heading3-bold'>Recommend</h3>
        <hr className="my-4" />
        {allUser?.map((user) => (
            <UserCard key={user.id} userData={user} update={getAllUser} />
        ))}
      </div>
    </div>
  )
}

export default RightSideBar