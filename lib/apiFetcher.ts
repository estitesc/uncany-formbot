export const fetchEmbedding: any = async (input: string) => {
  const url = `https://api.openai.com/v1/embeddings`;
  const openAIKey = process.env.OPENAI_API_KEY;

  const requestBody = {
    input: input,
    model: "text-embedding-ada-002",
  };
  // console.log("About to send embedding thing");
  // console.log(requestBody);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAIKey as string}`,
    },

    body: JSON.stringify(requestBody),
  });

  const responseJson = await response.json();
  //   console.log("response is", responseJson.data);
  return responseJson.data[0].embedding;
};
