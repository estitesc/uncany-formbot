import {
  collection,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  addDoc,
  query,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../lib/firebase";
import { unwindSnapshot } from "../util/modelHelper";
import { generateMiniSilly } from "../util/sillyStringer";

export const createThread = async (
  userId: string,
  type: string,
  convoState: string
) => {
  const userRef = doc(database, "users", userId);
  const threadsRef = collection(userRef, "threads");

  try {
    const docRef = await addDoc(threadsRef, {
      type,
      convoState,
      createdAt: new Date(),
    });
    console.log("Thread written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding new thread: ", e);
  }
};

export const createNamedThread = async (
  userId: string,
  type: string,
  convoState: string,
  threadId?: string
) => {
  const silly = generateMiniSilly();
  const newThreadId = threadId || silly;

  const userRef = doc(database, "users", userId);
  const threadsRef = collection(userRef, "threads");
  const threadRef = doc(threadsRef, newThreadId);

  try {
    await setDoc(threadRef, {
      type,
      convoState,
      createdAt: new Date(),
    });
    console.log("Thread written with ID: ", newThreadId);
    return newThreadId;
  } catch (e) {
    console.error("Error adding new thread: ", e);
  }
};

export const getThreadsForUser = async (userId: string) => {
  const userRef = doc(database, "users", userId);
  const q = query(collection(userRef, "threads"));

  const querySnapshot = await getDocs(q);
  const result = unwindSnapshot(querySnapshot);
  return result;
};

export const getThreadOrUserRef = (userId: string, threadId: string) => {
  const userRef = doc(database, "users", userId);

  if (threadId) {
    const threadCollRef = collection(userRef, "threads");
    const threadRef = doc(threadCollRef, threadId);
    return threadRef;
  } else {
    return userRef;
  }
};

export const getThreadRef = (userId: string, threadId: string) => {
  const userRef = doc(database, "users", userId);
  const threadCollRef = collection(userRef, "threads");
  const threadRef = doc(threadCollRef, threadId);
  return threadRef;
};

export const setThreadRefState = async (threadRef: any, state: string) => {
  try {
    await updateDoc(threadRef, {
      state,
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const getThreadDataFromRef = async (threadRef: any) => {
  const threadSnap = await getDoc(threadRef);

  if (threadSnap.exists()) {
    // console.log("Thread data is:", threadSnap.data());
    return threadSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const getThreadData = async (userId: string, threadId: string) => {
  const threadRef = getThreadRef(userId, threadId);
  return getThreadDataFromRef(threadRef);
};

export const setThreadDataFromRef = async (threadRef: any, data: any) => {
  try {
    await setDoc(threadRef, data, { merge: true });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const listenUserThreads = (
  userId: string,
  callback: (threads: any) => void
) => {
  const userRef = doc(database, "users", userId);
  const q = query(collection(userRef, "threads"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const result = unwindSnapshot(querySnapshot);
    callback(result);
  });

  return unsubscribe;
};

export const setFeedbackForThread = async (
  threadRef: any,
  projectId: string,
  feedback: string
) => {
  const threadFeedbacksRef = collection(threadRef, "feedbacks");

  try {
    await addDoc(threadFeedbacksRef, {
      projectId,
      feedback,
      createdAt: new Date(),
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
