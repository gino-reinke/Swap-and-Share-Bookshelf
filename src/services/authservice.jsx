import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    signOut,
  } from "firebase/auth";
  import {
    doc,
    setDoc,
    getDoc,
    updateDoc,          //  ← NEW
  } from "firebase/firestore";
  import { auth, firestore } from "../firebase";
  
  /* ------------------------------------------------------------------ */
  /*  Validators                                                         */
  /* ------------------------------------------------------------------ */
  const validateCredentials = (email, password, username = null) => {
    const RegexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const RegexPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!RegexEmail.test(email)) {
      throw new Error("Invalid email format.");
    }
    if (!RegexPass.test(password)) {
      throw new Error(
        "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character."
      );
    }
    if (username && username.length > 16) {
      throw new Error("Username must be 16 characters or less.");
    }
  };
  
  /* ------------------------------------------------------------------ */
  /*  Helper – map Firebase errors to user-friendly messages             */
  /* ------------------------------------------------------------------ */
  const mapAuthError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-email":
        return "Invalid email format.";
      default:
        return error.message;
    }
  };
  
/* ------------------------------------------------------------------ */
/*  Log in (adds empty favorites array if missing)                    */
/* ------------------------------------------------------------------ */
export const handleLogin = async (email, password) => {
    try {
      validateCredentials(email, password);
  
      const { user } = await signInWithEmailAndPassword(auth, email, password);
  
      // Ensure e-mail is verified
      await user.reload();
      if (!user.emailVerified) {
        await signOut(auth);
        throw new Error("Please verify your email before logging in.");
      }
  
      /* -------------------------------------------------------------- */
      /*  Guarantee Firestore profile exists and has `favorites` field  */
      /* -------------------------------------------------------------- */
      const userRef = doc(firestore, "users", user.uid);
      const snap = await getDoc(userRef);
  
      if (!snap.exists()) {
        // legacy / migrated accounts – create from scratch
        await setDoc(userRef, {
          email: user.email,
          username: user.displayName || "",
          favorites: [],
        });
      } else if (!Array.isArray(snap.data().favorites)) {
        // document exists but favorites missing
        await updateDoc(userRef, { favorites: [] });
      }
  
      console.log("User logged in:", user.displayName);
      return { success: true, user };
    } catch (err) {
      console.error("Error logging in:", err);
      throw new Error(mapAuthError(err));
    }
  };
  
  /* ------------------------------------------------------------------ */
  /*  Sign up (creates matching Firestore user document)                 */
  /* ------------------------------------------------------------------ */
  export const handleSignup = async (email, password, username) => {
    try {
      validateCredentials(email, password, username);
  
      // 1. Create Auth account
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      // 2. Add display name
      await updateProfile(user, { displayName: username });
  
      // 3. Create Firestore user profile (incl. empty favorites array)
      await setDoc(doc(firestore, "users", user.uid), {
        email,
        username,
        favorites: [],
      });
  
      // 4. Send e-mail verification
      await sendEmailVerification(user);
  
      console.log("User signed up:", user);
  
      // 5. Immediately sign the user out until verification is complete
      await signOut(auth);
  
      return {
        success: true,
        message: "Account created! Please verify your email before logging in.",
      };
    } catch (err) {
      console.error("Error signing up:", err);
  
      if (err.code === "auth/email-already-in-use") {
        return {
          success: false,
          message: "This email is already in use. Try signing in instead.",
        };
      }
  
      return { success: false, message: mapAuthError(err) };
    }
  };
  