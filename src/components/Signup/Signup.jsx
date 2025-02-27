import React, { useState } from 'react';
import styles from './Signup.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { getImageUrl } from '../../utils';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update user profile with the username
            await updateProfile(user, {
                displayName: username,
            });

            console.log('User signed up:', user);
            alert('Account successfully created!');
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Error signing up, try again...');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validatePassword = (password) => {
        const length = password.length >= 8;
        const uppercase = /[A-Z]/.test(password);
        const number = /[0-9]/.test(password);
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setPasswordValidations({
            length,
            uppercase,
            number,
            specialChar,
        });
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    return (
        <section className={styles.container}>
            <img 
                src={getImageUrl("signup/signupLibrary.png")} 
                alt="Little Library Image" 
                className={styles.heroImg}
            />

            <div className={styles.content}>
                <h1 className={styles.title}>Create an account</h1>
                <p className={styles.description}>
                    Access your personalized book swapping experience.
                </p>

                <form onSubmit={handleSignup}>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            placeholder="email@address.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Username</label>
                        <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Password</label>
                        <div className={styles.passwordContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="**********"
                                value={password}
                                onChange={handlePasswordChange}
                                className={styles.input}
                                required
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <ul className={styles.passwordRequirements}>
                            <li className={passwordValidations.length ? styles.valid : styles.invalid}>
                                {passwordValidations.length ? <Check size={16} /> : <X size={16} />} At least 8 characters long
                            </li>
                            <li className={passwordValidations.uppercase ? styles.valid : styles.invalid}>
                                {passwordValidations.uppercase ? <Check size={16} /> : <X size={16} />} At least one uppercase letter
                            </li>
                            <li className={passwordValidations.number ? styles.valid : styles.invalid}>
                                {passwordValidations.number ? <Check size={16} /> : <X size={16} />} At least one number
                            </li>
                            <li className={passwordValidations.specialChar ? styles.valid : styles.invalid}>
                                {passwordValidations.specialChar ? <Check size={16} /> : <X size={16} />} At least one special character
                            </li>
                        </ul>
                    </div>

                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Confirm Password</label>
                        <div className={styles.passwordContainer}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="**********"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                className={styles.input}
                                required
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className={styles.loginBtn}>Create Account</button>
                </form>

                <p className={styles.registerPrompt}>
                    Already have an account? <Link to="/signin">Sign in</Link>
                </p>
            </div>
        </section>
    );
};