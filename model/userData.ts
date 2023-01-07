import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  getDocs,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../lib/firebase";
import { unwindSnapshot } from "../util/modelHelper";

export const createUser = async () => {
  const userCollRef = collection(database, "users");

  try {
    const docRef = await addDoc(userCollRef, { createdAt: new Date() });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const setConfCode = async (userId: string, confCode: string) => {
  const userRef = doc(database, "users", userId);

  try {
    await updateDoc(userRef, {
      confCode,
      confSetAt: new Date(),
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const getUsers = async () => {
  const usersRef = collection(database, "users");
  const q = query(usersRef);

  const querySnapshot = await getDocs(q);
  const result = unwindSnapshot(querySnapshot);

  return result;
};

export const getUserData = async (userId: string) => {
  const userRef = doc(database, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    console.log("Document data:", userSnap.data());
    return userSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const userExists = async (userId: string) => {
  const userRef = doc(database, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return true;
  } else {
    return false;
  }
};

export const setPhone = async (userId: string, phone: string) => {
  const userRef = doc(database, "users", userId);

  try {
    await updateDoc(userRef, {
      phone,
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const getUserByPhone = async (phone: string) => {
  const userRef = collection(database, "users");
  const q = query(userRef, where("phone", "==", phone));

  const querySnapshot = await getDocs(q);
  const result = unwindSnapshot(querySnapshot);

  return result;
};

export const setUserData = async (userId: string, data: any) => {
  const userRef = doc(database, "users", userId);

  try {
    await updateDoc(userRef, data);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const deleteUser = async (userId: string) => {
  const userRef = doc(database, "users", userId);

  try {
    await deleteDoc(userRef);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
