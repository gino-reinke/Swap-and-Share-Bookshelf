import styles from '../App.module.css'
import { Navbar } from '../components/Navbar/Navbar'
import { Login } from '../components/Login/Login'
import { Footer } from '../components/Footer/Footer'


function LoginPage() {
  return <div className={styles.App}>
        <Navbar />
        <div className={styles.Main}>
          <Login />
        </div>
        <Footer />
      </div>
  
}

export default LoginPage


