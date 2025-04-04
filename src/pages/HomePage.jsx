import styles from '../App.module.css';
import { Hero } from '../components/Hero/Hero';
import { Navbar } from '../components/Navbar/Navbar';
import { LocalListings } from '../components/LocalListings/LocalListings';
import { Footer } from '../components/Footer/Footer';

function HomePage() {
  return (
    <div className={styles.App}>
      <Navbar />
      <div className={styles.Main}>
        <Hero />
        <LocalListings />
        {/* any other components */}
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
