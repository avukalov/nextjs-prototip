"use client"

import React from 'react'
import styles from './navbar.module.css'
import { signIn, useSession } from "next-auth/react"

const NavbarAuth = () => {
  const session = useSession();
  console.log(session);

  return (
    <>
      {
        session.status === "unauthenticated" &&
        <button
          className={styles.logout}
          onClick={() => {
            signIn('duende-identityserver6',
              { callbackUrl: "http://localhost:3000/about" }
            )
            // signIn()
          }}
        >
          Login
        </button>
      }
      {
        session.status === "authenticated" &&
        <button
          className={styles.logout}
          onClick={() => window.location.href = "/api/auth/federated-logout"}
        >
          Logout
        </button>
      }
    </>
  )
}

export default NavbarAuth