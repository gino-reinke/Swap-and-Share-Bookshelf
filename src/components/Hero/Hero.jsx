import React, { useRef } from 'react'
import styles from './Hero.module.css'
import { getImageUrl } from '../../utils'

import { firestore } from '../../firebase'
import { addDoc, collection } from 'firebase/firestore'

export const Hero = () => {
    return (
      <section className={styles.container}>
          <div className={styles.content}>
              <h1 className={styles.title}>SWAP AND SHARE BOOKSHELF</h1>
              <p className={styles.description}>Swap and Share Bookshelf connects readers to trade books effortlessly and reduce waste in a sustainable, community-driven way.</p>
              <a href="/marketplace" className={styles.exploreBtn}>Explore Now</a>
          </div>
          <img src={getImageUrl("hero/littleLibrary.png")} alt="Little Library Image" className={styles.heroImg}/>
      </section>
    )
  }
  