import { procHasTeam } from "../inter/findHasTeam";

export const handleHasTeam = async (
  uid: string,
  threadRef: any,
  completion: string
) => {
  const result = procHasTeam(completion);
  console.log("result is", result);

  if (result.hasTeamValid) {
    return result;
  }
};
