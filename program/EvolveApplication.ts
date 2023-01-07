import { useRunLangNodeAsync } from "../h/useRunLangNodeAsync";
import evolveApplication from "../inter/evolveApplication";
import { handleStoreApplication } from "../handler/handleStoreApplication";

const EvolveApplication: ProgramNode = (threadProps: ThreadProps) => {
  const runLangNode = useRunLangNodeAsync(threadProps);

  return async () => {
    const applicationEvolver: LanguageNode = {
      promptTemplate: evolveApplication,
      gptConfig: {
        temperature: 0.6,
        max_tokens: 1000,
        stop: "}",
      },
      completionHandler: handleStoreApplication,
    };

    await runLangNode(applicationEvolver);
  };
};

export default EvolveApplication;
