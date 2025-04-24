import styles from '../App.module.css'
import { Favorites } from '../components/Favorites/Favorites'
import { Navbar } from '../components/Navbar/Navbar'
import { Footer } from '../components/Footer/Footer'


function FavoritesPage() {
  return <div className={styles.App}>
        <div className={styles.App}>
          <Navbar />
          <div className={styles.Main}>
            <Favorites />
            {/* any other components */}
          </div>
          <Footer />
        </div>
  </div>
  
}

export default FavoritesPage


