import styles from '../App.module.css'
import { Hero } from '../components/Hero/Hero'
import { Navbar } from '../components/Navbar/Navbar'
import { Login } from '../components/Login/Login'
import "../vars.css"


function Home() {
  return <div className={styles.App}>
    <Navbar />
    <Hero />
  </div>
  
}

export default Home


