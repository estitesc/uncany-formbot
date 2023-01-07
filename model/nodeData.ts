import {
  collection,
  doc,
  query,
  getDocs,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../lib/firebase";
import { unwindSnapshot } from "../util/modelHelper";

export const getNodeRef = (userId: string, nodeId: string) => {
  const userRef = doc(database, "users", userId);
  const nodeCollRef = collection(userRef, "nodes");
  const nodeRef = doc(nodeCollRef, nodeId);
  return nodeRef;
};

export const getNodeData = async (userId: string, nodeId: string) => {
  const nodeRef = getNodeRef(userId, nodeId);
  const nodeSnap = await getDoc(nodeRef);

  if (nodeSnap.exists()) {
    console.log("Document data:", nodeSnap.data());
    return nodeSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const listenNodeData = (
  userId: string,
  nodeId: string,
  callback: (program: any) => void
) => {
  const nodeRef = getNodeRef(userId, nodeId);

  const unsubscribe = onSnapshot(nodeRef, (doc) => {
    callback(doc.data());
  });

  return unsubscribe;
};

export const getNodesForUser = async (userId: string) => {
  const userRef = doc(database, "users", userId);
  const q = query(collection(userRef, "nodes"));

  const querySnapshot = await getDocs(q);
  const result = unwindSnapshot(querySnapshot);
  return result;
};

export const setNodeDataFromRef = async (nodeRef: any, data: any) => {
  try {
    await setDoc(nodeRef, data, { merge: true });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const createNamedNode = async (userId: string, nodeId: string) => {
  const userRef = doc(database, "users", userId);
  const nodesRef = collection(userRef, "nodes");
  const nodeRef = doc(nodesRef, nodeId);

  try {
    await setDoc(nodeRef, {
      createdAt: new Date(),
    });
    console.log("Node created with ID: ", nodeId);
    return nodeId;
  } catch (e) {
    console.error("Error adding new node: ", e);
  }
};

export const listenUserNodes = (
  userId: string,
  callback: (nodes: any) => void
) => {
  const userRef = doc(database, "users", userId);
  const q = query(collection(userRef, "nodes"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const result = unwindSnapshot(querySnapshot);
    callback(result);
  });

  return unsubscribe;
};
