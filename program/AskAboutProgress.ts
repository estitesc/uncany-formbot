import { handleStoreReply } from "../handler/handleStoreReply";
import { useRunLangNodeAsync } from "../h/useRunLangNodeAsync";
import askAboutProgress from "../resp/askAboutProgress";

const AskAboutProgress: ProgramNode = (threadProps: ThreadProps) => {
  console.log("running ask about Progress");

  const runLangNode = useRunLangNodeAsync(threadProps);

  return async () => {
    const dialogResponder: LanguageNode = {
      promptTemplate: askAboutProgress,
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

export default AskAboutProgress;
