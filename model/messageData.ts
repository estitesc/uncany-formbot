import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../lib/firebase";
import { unwindSnapshot } from "../util/modelHelper";

export const createGlobalMessage = async (
  userId: string,
  threadId: string,
  threadMessageId: string,
  body: string,
  decoratedBody: string,
  embedding: number[],
  senderType: string
) => {
  const messagesRef = collection(database, "messages");

  try {
    const docRef = await addDoc(messagesRef, {
      userId,
      threadId,
      threadMessageId,
      body,
      decoratedBody,
      embedding,
      senderType,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getAllMessages = async () => {
  const q = query(collection(database, "messages"));

  const querySnapshot = await getDocs(q);
  const result = unwindSnapshot(querySnapshot);
  return result;
};

// Get all messages for a given userId
export const getUserMessages = async (userId: string) => {
  const q = query(
    collection(database, "messages"),
    where("userId", "==", userId)
  );

  const querySnapshot = await getDocs(q);
  const result = unwindSnapshot(querySnapshot);
  return result;
};
