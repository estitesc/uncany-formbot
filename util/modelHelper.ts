import { QuerySnapshot } from "firebase/firestore";

export const unwindSnapshot = (querySnapshot: QuerySnapshot) => {
  let result: any = {};
  querySnapshot.forEach((doc) => {
    result[doc.id] = { id: doc.id, ...doc.data() };
  });

  return result;
};
