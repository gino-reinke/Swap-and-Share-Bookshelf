import styles from '../App.module.css'
import { Favorites } from '../components/Favorites/Favorites'
import { Navbar } from '../components/Navbar/Navbar'


function FavoritesPage() {
  return <div className={styles.App}>
    <Navbar />
    <Favorites />
  </div>
  
}

export default FavoritesPage


