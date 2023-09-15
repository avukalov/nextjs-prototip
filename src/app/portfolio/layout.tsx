import React, { ReactNode } from 'react'
import styles from './page.module.css'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <h1 className={styles.mainTitle}>Our Works</h1>
      {children}
    </div>
  )
}

export default Layout