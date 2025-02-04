import styles from '../App.module.css'
import { Navbar } from '../components/Navbar/Navbar'
import { About } from '../components/About/About'
import "../vars.css"


function AboutPage() {
  return <div className={styles.App}>
    <Navbar />
    <About />
  </div>
  
}

export default AboutPage


