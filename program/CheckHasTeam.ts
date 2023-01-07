import { useRunLangNodeAsync } from "../h/useRunLangNodeAsync";
import findHasTeam from "../inter/findHasTeam";
import { handleHasTeam } from "../handler/handleHasTeam";

const CheckHasTeam: ProgramNode = (threadProps: ThreadProps) => {
  console.log("running has team check");

  const runLangNode = useRunLangNodeAsync(threadProps);

  return async () => {
    const hasTeamInterpreter: LanguageNode = {
      promptTemplate: findHasTeam,
      gptConfig: {
        temperature: 0.4,
        max_tokens: 25,
        stop: "}",
      },
      completionHandler: handleHasTeam,
    };

    return await runLangNode(hasTeamInterpreter);
  };
};

export default CheckHasTeam;
