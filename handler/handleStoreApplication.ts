import { setThreadDataFromRef } from "../model/threadData";

export const handleStoreApplication = async (
  uid: string,
  threadRef: any,
  body: string
) => {
  // Set the scene.
  await setThreadDataFromRef(threadRef, { application: body });
};
