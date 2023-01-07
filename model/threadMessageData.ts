import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  getDocs,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { callEmbedApi } from "../lib/embedApiCaller";
import { database } from "../lib/firebase";
import { unwindSnapshot } from "../util/modelHelper";
import { getThreadDataFromRef, setThreadDataFromRef } from "./threadData";

export const getIncMessageIdAndIncrement = async (threadRef: any) => {
  const threadData: any = await getThreadDataFromRef(threadRef);
  let newMessageId = 1;
  if (threadData.messageIdInc) {
    newMessageId = threadData.messageIdInc + 1;
  }
  console.log("newMessage Id", newMessageId);
  setThreadDataFromRef(threadRef, { messageIdInc: newMessageId });

  return newMessageId.toString();
};

export const createMessageAndEmbed = async (
  userId: string,
  threadId: string,
  body: string,
  subthreadId: string
) => {
  const userRef = doc(database, "users", userId);
  const threadCollRef = collection(userRef, "threads");
  const threadRef = doc(threadCollRef, threadId);

  const newMessageId = await getIncMessageIdAndIncrement(threadRef);

  const messageRef = doc(threadRef, "messages", newMessageId);

  console.log("subthread ID here", subthreadId);
  try {
    await setDoc(messageRef, {
      body,
      createdAt: new Date(),
      subthreadId,
    });
    console.log("Document written with ID: ", newMessageId);

    // Then also get the embedding and update the message with it and write the global
    await callEmbedApi(userId, threadId, newMessageId, body, "user");

    return newMessageId;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const setMessageDataFromThreadRef = async (
  threadRef: any,
  messageId: string,
  data: any
) => {
  const messageRef = doc(threadRef, "messages", messageId);
  try {
    await setDoc(messageRef, data, { merge: true });
    console.log("Document written with ID: ", messageId);
    return messageId;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const createThreadMessage = async (
  userId: string,
  threadId: string,
  body: string
) => {
  const userRef = doc(database, "users", userId);
  const threadCollRef = collection(userRef, "threads");
  const threadRef = doc(threadCollRef, threadId);
  const messagesCollRef = collection(threadRef, "messages");

  try {
    const docRef = await addDoc(messagesCollRef, {
      body,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const createThreadMessageFromRefWithTime = async (
  threadRef: any,
  body: string,
  createdAt: Date
) => {
  const messagesCollRef = collection(threadRef, "messages");

  try {
    const docRef = await addDoc(messagesCollRef, {
      body,
      createdAt: createdAt,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getThreadMessagesFromRef = async (threadRef: any) => {
  const q = query(collection(threadRef, "messages"));

  const querySnapshot = await getDocs(q);
  const result = unwindSnapshot(querySnapshot);

  return result;
};

export const getThreadMessages = async (userId: string, threadId: string) => {
  const userRef = doc(database, "users", userId);
  const threadCollRef = collection(userRef, "threads");
  const threadRef = doc(threadCollRef, threadId);
  const q = query(collection(threadRef, "messages"));

  const querySnapshot = await getDocs(q);
  const result = unwindSnapshot(querySnapshot);

  return result;
};

export const listenThreadMessages = (
  userId: string,
  threadId: string,
  callback: (messages: any) => void
) => {
  console.log("listening", userId, threadId);
  const userRef = doc(database, "users", userId);
  const threadCollRef = collection(userRef, "threads");
  const threadRef = doc(threadCollRef, threadId);
  const q = query(collection(threadRef, "messages"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const result = unwindSnapshot(querySnapshot);
    callback(result);
  });

  return unsubscribe;
};

export const getThreadMessageData = async (
  userId: string,
  threadId: string,
  messageId: string
) => {
  const userRef = doc(database, "users", userId);
  const threadRef = doc(userRef, "threads", threadId);
  const messageRef = doc(threadRef, "messages", messageId);

  const messageSnap = await getDoc(messageRef);

  if (messageSnap.exists()) {
    return messageSnap.data();
  } else {
    console.log("No such document!");
  }
};
