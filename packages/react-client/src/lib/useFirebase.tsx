import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider
} from "@react-firebase/auth";
import { FirebaseAuthProviderState } from "@react-firebase/auth/dist/types";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React, { useContext, useEffect, useReducer, useState } from "react";

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

interface CollectionsMap {
  [key: string]: {
    loading: boolean;
    data: any;
  };
}

const FirebaseContext = React.createContext<
  Partial<FirebaseAuthProviderState> & {
    dispatch: any;
    collections: Partial<CollectionsMap>;
  }
>({
  dispatch: () => {},
  collections: {}
});

export const FirebaseProvider: React.FC<{
  config: FirebaseConfig;
}> = ({ config, children }) => {
  const [collectionsMap, dispatch] = useReducer(reducer, {});

  return (
    <FirebaseAuthProvider firebase={firebase} {...config}>
      <FirebaseAuthConsumer>
        {(firebaseProps: FirebaseAuthProviderState) => {
          const { providerId } = firebaseProps;
          // 1. Before/during auth, providerId === null
          // 2. After auth, providerId === string
          if (providerId == null) return <div>Loading...</div>;

          return (
            <FirebaseContext.Provider
              value={{
                ...firebaseProps,
                dispatch,
                collections: collectionsMap
              }}
            >
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

export const useAddDocument = (collection: string) => {
  const { firebase, dispatch } = useFirebase();
  const [loading, setLoading] = useState(false);
  const db = firebase.firestore();
  const add = async (values: any) => {
    setLoading(true);
    try {
      const data = await db.collection(collection).add(values);
      dispatch({
        type: "FETCH_COLLECTION_START",
        name: collection
      });
      const collectionData = await fetchCollection(collection, firebase);
      dispatch({
        type: "FETCH_COLLECTION_END",
        name: collection,
        data: collectionData
      });
      setLoading(false);
      return data;
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return { add, loading };
};

export const useCollection = (name: string) => {
  const { firebase, dispatch, collections } = useFirebase();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({
        type: "FETCH_COLLECTION_START",
        name
      });
      const fetchedCollection = await fetchCollection(name, firebase);
      dispatch({
        type: "FETCH_COLLECTION_END",
        name,
        data: fetchedCollection
      });
    };

    fetchData();
  }, [firebase, dispatch, name]);

  return collections[name] || { loading: null, data: null };
};

type Action =
  | {
      type: "FETCH_COLLECTION_START";
      name: string;
    }
  | {
      type: "FETCH_COLLECTION_END";
      name: string;
      data: any;
    };

function reducer(state: CollectionsMap, action: Action) {
  switch (action.type) {
    case "FETCH_COLLECTION_START":
      const collection = state[action.name] || { loading: null, data: null };

      return {
        ...state,
        [action.name]: {
          loading: true,
          data: collection.data
        }
      };
    case "FETCH_COLLECTION_END":
      return {
        ...state,
        [action.name]: {
          loading: false,
          data: action.data
        }
      };
  }
}
