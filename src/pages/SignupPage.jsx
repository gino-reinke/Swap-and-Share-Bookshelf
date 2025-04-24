import styles from '../App.module.css'
import { Navbar } from '../components/Navbar/Navbar'
import { Signup } from '../components/Signup/Signup'
import { Footer } from '../components/Footer/Footer'
import "../vars.css"


function SignupPage() {
  return <div className={styles.App}>
        <Navbar />
        <div className={styles.Main}>
          <Signup />
        </div>
        <Footer />
      </div>
  
}

export default SignupPage


