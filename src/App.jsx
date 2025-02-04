import { useState } from "react";
import styles from "./App.module.css";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import SignUp from "./components/SignUp/SignUp";
import CreateAccount from "./components/CreateAccount/CreateAccount";

function App() {
    const [showSignUp, setShowSignUp] = useState(true);

    const handleCreateAccount = () => {
        setShowSignUp(false);
    };

    return (
        <div className={styles.App}>
            <Navbar />
            {showSignUp ? (
                <>
                    <SignUp onCreateAccount={handleCreateAccount} />
                    <button onClick={() => setShowSignUp(false)}>
                        Go to Create Account
                    </button>
                </>
            ) : (
                <>
                    <CreateAccount />
                    <button onClick={() => setShowSignUp(true)}>
                        Go to Sign Up
                    </button>
                </>
            )}
            {!showSignUp && <Hero />}
        </div>
    );
}

export default App;