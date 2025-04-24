import styles from '../App.module.css'
import { Navbar } from '../components/Navbar/Navbar'
import { About } from '../components/About/About'
import { Footer } from '../components/Footer/Footer'


function AboutPage() {
  return <div className={styles.App}>
        <Navbar />
        <div className={styles.Main}>
          <About />
        </div>
        <Footer />
      </div>
  
}

export default AboutPage


