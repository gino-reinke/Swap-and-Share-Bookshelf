import styles from '../App.module.css'
import { Navbar } from '../components/Navbar/Navbar'
import { MyListings } from '../components/MyListings/MyListings'
import { Footer } from '../components/Footer/Footer'
import "../vars.css"


function MarketplacePage() {
  return <div className={styles.App}>
        <div className={styles.App}>
          <Navbar />
          <div className={styles.Main}>
            <MyListings />
            {/* any other components */}
          </div>
          <Footer />
        </div>
  </div>
  
}

export default MarketplacePage