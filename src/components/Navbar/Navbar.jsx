import React, {useState} from 'react'
import styles from './Navbar.module.css'
import { getImageUrl } from '../../utils'

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>

      {/* TODO: change title element to custom logo */}
      <a className={styles.title} href="/">Swap & Share Bookshelf</a> 

    </nav>
    )

}
