"use client"

import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect } from 'react'

const Signin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');

    if (!searchParams.has("error")) {
      // Redirect to home page if manually navigated
      router.push("/")
    }

    if (error === "Callback") {
      router.push("/")
    }

  }, []);

  return (
    <div></div>
  )
}

export default Signin