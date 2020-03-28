import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider
} from "@react-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from "react";
import { firebaseConfig } from "./firebase";

interface FirebaseProps {
  isSignedIn: boolean;
  user: any; // todo
  firebase: any; // todo
}

const FirebaseContext = React.createContext<Partial<FirebaseProps>>({});

export const FirebaseProvider: React.FC = ({ children }) => {
  return (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
      <FirebaseAuthConsumer>
        {(firebaseProps: FirebaseProps) => {
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
