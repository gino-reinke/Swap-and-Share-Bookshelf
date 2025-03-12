import React, { useState } from 'react';
import styles from './Signup.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { handleSignup } from '../../services/authservice';
import { getImageUrl } from '../../utils';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const [passwordValidations, setPasswordValidations] = useState({
        length: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
    const validateUsername = (username) => username.length > 0 && username.length <= 16;

    const onSignup = async (e) => {
        e.preventDefault();
        setErrors({});

        let newErrors = {};

        if (!validateEmail(email)) newErrors.email = 'Invalid email format.';
        if (!validateUsername(username)) newErrors.username = 'Username must be between 1 and 16 characters.';
        if (!validatePassword(password)) newErrors.password = 'Password must include uppercase, lowercase, a number, and a special character.';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const { success, message } = await handleSignup(email, password, username);
            if (success) {
                alert('Account created! Please verify your email.');
                navigate('/signin');
            } else {
                setErrors({ firebase: message });
            }
        } catch (error) {
            setErrors({ firebase: error.message });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);

        setPasswordValidations({
            length: newPassword.length >= 8,
            uppercase: /[A-Z]/.test(newPassword),
            number: /[0-9]/.test(newPassword),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
        });
    };

    return (
        <section className={styles.container}>
            <img src={getImageUrl("signup/signupLibrary.png")} alt="Signup Image" className={styles.heroImg} />

            <div className={styles.content}>
                <h1 className={styles.title}>Create an account</h1>
                <p className={styles.description}>Access your personalized book swapping experience.</p>

                <form onSubmit={onSignup}>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required />
                        {errors.email && <p className={styles.error}>{errors.email}</p>}
                    </div>

                    <div className={styles.inputContainer}>
                        <label className={styles.label}>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.input} required />
                        {errors.username && <p className={styles.error}>{errors.username}</p>}
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
                        {errors.password && <p className={styles.error}>{errors.password}</p>}
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
                        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
                    </div>

                    {errors.firebase && <p className={styles.error}>{errors.firebase}</p>}

                    <button type="submit" className={styles.loginBtn}>Create Account</button>
                </form>

                <p className={styles.registerPrompt}>
                    Already have an account? <Link to="/signin">Sign in</Link>
                </p>
            </div>
        </section>
    );
};
