import { handleStoreReply } from "../handler/handleStoreReply";
import { useRunLangNodeAsync } from "../h/useRunLangNodeAsync";
import concludeInterview from "../resp/concludeInterview";

const ConcludeInterview: ProgramNode = (threadProps: ThreadProps) => {
  console.log("running Conclude interview");

  const runLangNode = useRunLangNodeAsync(threadProps);

  return async () => {
    const dialogResponder: LanguageNode = {
      promptTemplate: concludeInterview,
      gptConfig: {
        temperature: 0.9,
        max_tokens: 100,
        stop: "HUMAN",
      },
      completionHandler: handleStoreReply,
    };

    await runLangNode(dialogResponder);
  };
};

export default ConcludeInterview;
