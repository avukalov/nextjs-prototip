"use client"

import { useEffect } from 'react'
import { signOut } from "next-auth/react"

const FederatedLogoutCallback = () => {
  useEffect(() => {
    signOut({ callbackUrl: 'http://localhost:3000/' })
    // signOut({ redirect: false, callbackUrl: 'http://localhost:3000/' })
  }, [])

  return (
    <div>
      {/* Loggin out ... */}
    </div>
  )
}

export default FederatedLogoutCallback