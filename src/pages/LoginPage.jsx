import styles from '../App.module.css'
import { Navbar } from '../components/Navbar/Navbar'
import { Login } from '../components/Login/Login'
import "../vars.css"


function LoginPage() {
  return <div className={styles.App}>
    <Navbar />
    <Login />
  </div>
  
}

export default LoginPage


