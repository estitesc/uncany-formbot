export const apiPath =
  process.env.NODE_ENV === "production"
    ? "https://www.tht.ooo/api"
    : "http://localhost:3000/api";

export const callEmbedApi = async (
  userId: string,
  threadId: string,
  messageId: string,
  body: string,
  senderType: string
) => {
  const response = await fetch(`${apiPath}/storePersonalMessageEmbedding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: userId,
      threadId,
      messageId,
      body,
      senderType,
    }),
  });
  // console.log("API response for spin off functions", response);
};
