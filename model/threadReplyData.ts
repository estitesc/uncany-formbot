import {
  addDoc,
  collection,
  doc,
  query,
  getDocs,
  onSnapshot,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { callEmbedApi } from "../lib/embedApiCaller";
import { database } from "../lib/firebase";
import { unwindSnapshot } from "../util/modelHelper";
import { getIncMessageIdAndIncrement } from "./threadMessageData";

export const createThreadReplyAndEmbed = async (
  userId: string,
  threadRef: any,
  threadId: string,
  body: string,
  subthreadId: string
) => {
  console.log("in create");
  const newReplyId = await getIncMessageIdAndIncrement(threadRef);
  console.log("new reply id", newReplyId, typeof newReplyId);
  const replyRef = doc(threadRef, "replies", newReplyId);

  try {
    setDoc(replyRef, {
      body,
      subthreadId,
      createdAt: new Date(),
    });

    await callEmbedApi(userId, threadId, newReplyId, body, "ai");
    console.log("Document written with ID: ", newReplyId);

    return newReplyId;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const createThreadReplyFromRef = async (
  threadRef: any,
  body: string
) => {
  const repliesCollRef = collection(threadRef, "replies");

  try {
    const docRef = await addDoc(repliesCollRef, {
      body,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const createThreadReplyFromRefWithTime = async (
  threadRef: any,
  body: string,
  createdAt: Date
) => {
  const repliesCollRef = collection(threadRef, "replies");

  try {
    const docRef = await addDoc(repliesCollRef, {
      body,
      createdAt: createdAt,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const createThreadReply = async (
  userId: string,
  threadId: string,
  body: string
) => {
  const userRef = doc(database, "users", userId);
  const threadCollRef = collection(userRef, "threads");
  const threadRef = doc(threadCollRef, threadId);
  const messagesCollRef = collection(threadRef, "replies");

  try {
    const docRef = await addDoc(messagesCollRef, {
      body,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getThreadRepliesFromRef = async (threadRef: any) => {
  const q = query(collection(threadRef, "replies"));

  const querySnapshot = await getDocs(q);
  const result = unwindSnapshot(querySnapshot);

  return result;
};

export const getThreadReplies = async (userId: string, threadId: string) => {
  const userRef = doc(database, "users", userId);
  const threadCollRef = collection(userRef, "threads");
  const threadRef = doc(threadCollRef, threadId);
  const q = query(collection(threadRef, "replies"));

  const querySnapshot = await getDocs(q);
  const result = unwindSnapshot(querySnapshot);

  return result;
};

export const listenThreadReplies = (
  userId: string,
  threadId: string,
  callback: (replies: any) => void
) => {
  const userRef = doc(database, "users", userId);
  const threadCollRef = collection(userRef, "threads");
  const threadRef = doc(threadCollRef, threadId);
  const q = query(collection(threadRef, "replies"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const result = unwindSnapshot(querySnapshot);
    callback(result);
  });

  return unsubscribe;
};

export const getThreadReplyData = async (
  userId: string,
  threadId: string,
  replyId: string
) => {
  const userRef = doc(database, "users", userId);
  const threadRef = doc(userRef, "threads", threadId);
  const replyRef = doc(threadRef, "replies", replyId);

  const threadSnap = await getDoc(replyRef);

  if (threadSnap.exists()) {
    return threadSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const setReplyDataFromThreadRef = async (
  threadRef: any,
  replyId: string,
  data: any
) => {
  const replyRef = doc(threadRef, "replies", replyId);
  try {
    await setDoc(replyRef, data, { merge: true });
    console.log("Document written with ID: ", replyId);
    return replyId;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
