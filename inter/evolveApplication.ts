export const initSummary =
  "The HUMAN is working on a startup company and they are applying to HF0 with their idea.";

const evolveApplication = (dialog: string, config: any, threadData: any) => {
  const application = threadData?.application || initSummary;

  return `In the following examples, an summary of the HUMAN applicant's project is updated according to the new details provided by the applicant in the dialog, but if no new information is provided then the description stays the same.

  project summaries contains information learned about the project during the AI's interview of the HUMAN, such as the nature of the work, the stage and progress they have made, details about the various team members, and 

  Example 1:

  Initial Project Summary:
  ${initSummary}

  Dialog:
  AI: So who is working on the project?
  HUMAN: Me and my co-founder Amy. 
  AI: What's each of your roles?
  HUMAN: I'm the CEO, focusing on sales and she's the CTO.

  New Project Summary:
  The applicant is working on a startup company and they are applying to HF0 with their idea. The HUMAN is working on the project with their co-founder Amy. The HUMAN is the CEO and Amy is the CTO.

  Example 2:

  Initial Project Summary:
  ${initSummary}

  Dialog:
  AI: Cool, what made you want to work on this idea?
  HUMAN: I've always been interested in robotics, and I wanted to build a platform that would make it easier for people to build their own robots.
  AI: That's awesome. What problem are you trying to solve?
  HUMAN: A lot of average people want to build robots, but they don't have the skills or resources to do it. It's tough out there for them.

  New Project Summary:
  The applicant is working on a startup company and they are applying to HF0 with their idea. The applicant is interested in robotics and wants to build a platform that would make it easier for people to build their own robots. The applicant is trying to solve the problem of people not having the skills or resources to build robots.

  Example 3:

  Initial Project Summary:
  ${application}

  Dialog:
  ${dialog}

  New Project Summary:
  `;
};

export default evolveApplication;
