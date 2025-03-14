import styles from '../App.module.css'
import { Navbar } from '../components/Navbar/Navbar'
import { Marketplace } from '../components/Marketplace/Marketplace'
import { Footer } from '../components/Footer/Footer'
import "../vars.css"


function MarketplacePage() {
  return <div className={styles.App}>
        <div className={styles.App}>
          <Navbar />
          <div className={styles.Main}>
            <Marketplace />
            {/* any other components */}
          </div>
          <Footer />
        </div>
  </div>
  
}

export default MarketplacePage


