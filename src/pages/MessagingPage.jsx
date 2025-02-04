import styles from '../App.module.css'
import { Messaging } from '../components/Messaging/Messaging'
import { Navbar } from '../components/Navbar/Navbar'


function MessagingPage() {
  return <div className={styles.App}>
    <Navbar />
    <Messaging />
  </div>
  
}

export default MessagingPage


