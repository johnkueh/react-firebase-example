import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider
} from "@react-firebase/auth";
import { FirebaseAuthProviderState } from "@react-firebase/auth/dist/types";
import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from "react";

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

const FirebaseContext = React.createContext<Partial<FirebaseAuthProviderState>>(
  {}
);

export const FirebaseProvider: React.FC<{
  config: FirebaseConfig;
}> = ({ config, children }) => {
  return (
    <FirebaseAuthProvider firebase={firebase} {...config}>
      <FirebaseAuthConsumer>
        {(firebaseProps: FirebaseAuthProviderState) => {
          const { providerId } = firebaseProps;
          // 1. Before/during auth, providerId === null
          // 2. After auth, providerId === string
          if (providerId == null) return <div>Loading...</div>;
          return (
            <FirebaseContext.Provider value={firebaseProps}>
              {children}
            </FirebaseContext.Provider>
          );
        }}
      </FirebaseAuthConsumer>
    </FirebaseAuthProvider>
  );
};

export const useFireBase = () => useContext(FirebaseContext);
