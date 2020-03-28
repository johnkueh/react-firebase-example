import { useEffect, useMemo, useState } from "react";
import { useFireBase } from "./useFirebase";

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
  const { firebase } = useMemo(useFireBase, []);

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
