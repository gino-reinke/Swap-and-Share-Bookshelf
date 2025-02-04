import styles from '../App.module.css'
import { Navbar } from '../components/Navbar/Navbar'
import { Marketplace } from '../components/Marketplace/Marketplace'
import "../vars.css"


function MarketplacePage() {
  return <div className={styles.App}>
    <Navbar />
    <Marketplace />
  </div>
  
}

export default MarketplacePage


