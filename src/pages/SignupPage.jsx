import styles from '../App.module.css'
import { Navbar } from '../components/Navbar/Navbar'
import { Signup } from '../components/Signup/Signup'
import "../vars.css"


function SignupPage() {
  return <div className={styles.App}>
    <Navbar />
    <Signup />
  </div>
  
}

export default SignupPage


