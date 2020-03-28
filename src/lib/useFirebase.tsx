import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider
} from "@react-firebase/auth";
import { FirebaseAuthProviderState } from "@react-firebase/auth/dist/types";
import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from "react";
import { firebaseConfig } from "./firebase";

const FirebaseContext = React.createContext<Partial<FirebaseAuthProviderState>>(
  {}
);

export const FirebaseProvider: React.FC = ({ children }) => {
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <FirebaseAuthConsumer>
        {(firebaseProps: FirebaseAuthProviderState) => {
          const { providerId } = firebaseProps;
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
