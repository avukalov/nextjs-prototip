import React from 'react'

import styles from './footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>&copy;2023 Lamamia. All rights reserved.</div>
      <div>
        <div className={styles.social}>
          <Image src="/1.png" width={15} height={15} className={styles.icon} alt="Lama Dev Faccebook Account" />
          <Image src="/2.png" width={15} height={15} className={styles.icon} alt="Lama Dev Instagram Account" />
          <Image src="/3.png" width={15} height={15} className={styles.icon} alt="Lama Dev Twitter Account" />
          <Image src="/4.png" width={15} height={15} className={styles.icon} alt="Lama Dev YouTube Account" />
        </div>
      </div>
    </div>
  )
}

export default Footer