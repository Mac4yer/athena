'use client'

import { Logout } from '@mui/icons-material';
import { SignOutButton, SignedIn, UserButton } from '@clerk/nextjs';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Menu from './Menu';

function LeftSideBar() {
  return (
    <div className="h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden custom-scrollbar">
      <Link href="/">
        <Image
          src="/assets/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="mb-6" // Added margin for spacing
        />
      </Link>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 items-center text-light-1">
          <Link href="/">
            <Image
              src="https://github.com/phuc-mai/vibezone/blob/master/public/assets/Andrew.jpg?raw=true"
              alt="Profile Hpto"
              width={50}
              height={50}
              className="rounded-full mb-2" // Added margin for spacing
            />
          </Link>
          <p className="text-small-bold">User</p>
        </div>

        <div className="flex text-light-1 justify-between">
          <div className="flex flex-col items-center">
            <p className="text-base-bold">1</p>
            <p className="text-tiny-medium">Post</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">1</p>
            <p className="text-tiny-medium">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">1</p>
            <p className="text-tiny-medium">Following</p>
          </div>
        </div>

        <hr className="my-4" /> {/* Added margin for spacing */}

        <Menu />

        <hr className="my-4" /> {/* Added margin for spacing */}

        <div className="flex gap-4 items-center">
          <UserButton />
          <p className="text-light-1 text-body-bold">Manage Account</p>
        </div>

        <SignedIn>
          <SignOutButton>
            <div className="flex cursor-pointer gap-4 items-center">
              <Logout sx={{ color: 'white', fontSize: '32px' }} />
              <p className="text-body-bold text-light-1">Log Out</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
}

export default LeftSideBar;
