import styles from '../App.module.css'
import { TradingTips } from '../components/TradingTips/TradingTips'
import { Navbar } from '../components/Navbar/Navbar'
import { Footer } from '../components/Footer/Footer'


function TradingTipsPage() {
  return <div className={styles.App}>
        <Navbar />
        <div className={styles.Main}>
          <TradingTips />
        </div>
        <Footer />
      </div>
  
}

export default TradingTipsPage