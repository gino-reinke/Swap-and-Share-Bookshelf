import styles from '../App.module.css'
import { Navbar } from '../components/Navbar/Navbar'
import { Account } from '../components/Account/Account'
import "../vars.css"


function AccountPage() {
  return <div className={styles.App}>
    <Navbar />
    <Account />
  </div>
  
}

export default AccountPage


