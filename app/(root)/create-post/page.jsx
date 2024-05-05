'use client'

import { useUser } from "@clerk/nextjs"
import Loader from "@components/Loader"
import Posting from "@components/form/Posting"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

const CreatePost = () => {

  const { user, isLoaded } = useUser();

  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({})

  if (user) {
    router.push('/create-post')
  } else {
    router.push('/sign-in')
  }

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`)
    const data = await response.json()
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const postData = {
    creatorId: userData?._id,
    caption: "",
    tag: "",
    postPhoto: null,
  };

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="pt-6">
      <Posting post={postData} apiEndpoint={"/api/post/new"} />
    </div>
  );
};

export default CreatePost;