"use client"

import { signIn, useSession } from "next-auth/react"
import React, { useEffect } from 'react'
import styles from "./page.module.css"
import useSWR from "swr"

const Dashboard = () => {
  const session = useSession();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      signIn("duende-identityserver6");
    }
  }, [])

  const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json())

  const { data, error, isLoading } = useSWR(
    `/api/posts?username=${session.data?.user.name}`,
    fetcher
  );

  console.log(data);

  if (session.status === "loading") {
    return (<p>Loading...</p>)
  }

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>Dashboard</div>
    )
  }
}

export default Dashboard