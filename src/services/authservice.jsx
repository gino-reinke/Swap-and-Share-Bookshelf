import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signOut
} from 'firebase/auth';
import { auth } from '../firebase';

const validateCredentials = (email, password, username = null) => {
    const RegexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const RegexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!RegexEmail.test(email)) throw new Error('Invalid email format.');
    if (!RegexPass.test(password)) throw new Error('Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.');
    if (username && username.length > 16) throw new Error('Username must be 16 characters or less.');
};

// Maps Firebase errors to user-friendly messages
const mapAuthError = (error) => {
    switch (error.code) {
        case 'auth/email-already-in-use': return 'This email is already in use.';
        case 'auth/user-not-found': return 'No account found with this email.';
        case 'auth/wrong-password': return 'Incorrect password. Please try again.';
        case 'auth/invalid-email': return 'Invalid email format.';
        default: return error.message;
    }
};

// Handles user login with email verification check
export const handleLogin = async (email, password) => {
    try {
        validateCredentials(email, password);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Reload user to get updated email verification status
        await user.reload();
        if (!user.emailVerified) {
            await signOut(auth); // Force logout if user is not verified
            throw new Error('Please verify your email before logging in.');
        }

        console.log('User logged in:', user.displayName);
        return { success: true, user };
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error(mapAuthError(error));
    }
};

// Handles user signup WITHOUT automatic login
export const handleSignup = async (email, password, username) => {
    try {
        validateCredentials(email, password, username);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Set username
        await updateProfile(user, { displayName: username });

        // Send email verification
        await sendEmailVerification(user);

        console.log('User signed up:', user);

        // Ensure the user is signed out after signup
        await signOut(auth);

        return { success: true, message: 'Account created! Please verify your email before logging in.' };
    } catch (error) {
        console.error('Error signing up:', error);

        if (error.code === 'auth/email-already-in-use') {
            return { success: false, message: 'This email is already in use. Try signing in instead.' };
        }

        return { success: false, message: mapAuthError(error) };
    }
};
