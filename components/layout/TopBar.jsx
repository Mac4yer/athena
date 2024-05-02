'use client'

import React, { useState } from 'react'
import { Logout, Search } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { Add } from "@mui/icons-material";
import { SignOutButton, SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

function TopBar() {

    const router = useRouter()
    const [search, setSearch] = useState('')

    return (
        <div className='flex justify-between items-center mt-6'>
            <div className='relative'>
                <input type="text" className='search-bar' placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)} />
                <Search className='search-icon' onClic={() => { }} />
            </div>
            <button className='create-post-btn' onclick={() => router.push('/create-post')}>
                <Add />
                <p>Create a Post</p>
            </button>

            <div className='flex gap-3'>
                <SignedIn>
                    <SignOutButton>
                        <div className="flex cursor-pointer gap-4 items-center md:hidden">
                            <Logout sx={{ color: 'white', fontSize: '32px' }} />
                        </div>
                    </SignOutButton>
                </SignedIn>

                <Link href='/'>
                    <Image className='rounded-full md:hidden' src='https://github.com/phuc-mai/vibezone/blob/master/public/assets/Andrew.jpg?raw=true' alt='Profile Photo' width={50} height={50} />
                </Link>
            </div>
        </div>
    )
}

export default TopBar