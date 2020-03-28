import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider
} from "@react-firebase/auth";
import { FirebaseAuthProviderState } from "@react-firebase/auth/dist/types";
import firebase from "firebase/app";
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

export const useFirebase = () => useContext(FirebaseContext);

export const fetchCollection = async (name: string, firebase: any) => {
  const db = firebase.firestore();
  const collectionRef = await db.collection(name).get();
  const collection = collectionRef.docs.map((project: any) => {
    return { id: project.id, ...project.data() };
  });
  return collection;
};

export const useCollection = (name: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { firebase } = useFirebase();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedCollection = await fetchCollection(name, firebase);
      setData(fetchedCollection);
      setLoading(false);
    };

    fetchData();
  }, [firebase, name]);

  return {
    loading,
    data
  };
};
