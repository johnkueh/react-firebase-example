export const fetchCollection = async (name: string, firebase: any) => {
  const db = firebase.firestore();
  const collectionRef = await db.collection(name).get();
  const collection = collectionRef.docs.map((project: any) => {
    return { id: project.id, ...project.data() };
  });
  return collection;
};
