import styles from './App.module.css'
import { Navbar } from './components/Navbar/Navbar'

function App() {
  console.log("App component rendered");
  return <div className={styles.App}>
    <Navbar />

    // test the Navbar component
  </div>
  
}

export default App
