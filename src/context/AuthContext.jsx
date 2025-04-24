import React, { createContext, useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase';   
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
              /* -------------------------------------------------------
               * 1.  Persist a public profile so *other* clients can
               *     look up this user’s displayName.
               * ----------------------------------------------------- */
              await setDoc(
                doc(firestore, 'users', user.uid),              // /users/{uid}
                {
                  displayName: user.displayName ?? '',         // public info only
                  email: user.email ?? '',
                },
                { merge: true }                                // don’t overwrite
              );
      
              /* 2.  Store the auth record locally for this session */
              setCurrentUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
              });
            } else {
              setCurrentUser(null);
            }
          });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
