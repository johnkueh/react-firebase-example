import firebase, { User } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

interface FirebaseConfig {
  authDomain: string;
  apiKey: string;
  databaseURL: string;
  projectId: string;
  messagingSenderId?: string;
  storageBucket?: string;
  appId?: string;
  measurementId?: string;
}

interface FirebaseProps {
  firebase: any;
  isSignedIn?: boolean;
  user?: User;
  dispatch: any;
}

const FirebaseContext = React.createContext<Partial<FirebaseProps>>({});

export const FirebaseProvider: React.FC<{
  config: FirebaseConfig;
}> = ({ config, children }) => {
  const [isSignedIn, setIsSignedIn] = useState<Partial<boolean>>();
  const [user, setUser] = useState<User>();
  const [firebaseApp, setFirebaseApp] = useState<firebase.app.App>();

  useEffect(() => {
    const firebaseApp = firebase.initializeApp(config);
    setFirebaseApp(firebaseApp);

    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUser(user);
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  }, [config]);

  if (isSignedIn == null) return <div>Loading...</div>;

  return (
    <FirebaseContext.Provider
      value={{
        isSignedIn,
        user,
        firebase: firebaseApp
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
