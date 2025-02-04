import styles from '../App.module.css'
import { TradingTips } from '../components/TradingTips/TradingTips'
import { Navbar } from '../components/Navbar/Navbar'


function TradingTipsPage() {
  return <div className={styles.App}>
    <Navbar />
    <TradingTips />
  </div>
  
}

export default TradingTipsPage