const findIsSolo = (dialog: string) => {
  return `
  AI: Hey, thanks for texting me. I'm the HF0 application bot. First what's your full name?
  HUMAN:  My name is Amanda Jean.
  WORKING SOLO?: No

  AI: You're saying We so does that mean you have a co-founder?
  HUMAN: Yep, I'm working with Margaret. 
  WORKING SOLO?: No

  AI: Cool, and are you working with anyone else?
  HUMAN: No I'm working alone atm
  WORKING SOLO?: Yes

  AI: Who else is on your team?
  HUMAN: Nobody, it's just me.
  WORKING SOLO?: Yes

  AI: Hello there. I'm the HF0 application bot. Mind sharing your full name with me?
  HUMAN: Dunzlee O'Neil
  WORKING SOLO?: No

  AI: What are the names of your team members?
  HUMAN: Janice and Bob
  WORKING SOLO?: No

  AI: Ok nice my friend Dunzlee. What's the name of your project or company?
  HUMAN: sqrt
  WORKING SOLO?: No

  AI: What's Jane's role on the team.
  HUMAN: She's the only one working on design.
  WORKING SOLO?: No

  AI: So is it just you on the team?
  HUMAN: Yea
  WORKING SOLO?: Yes

  AI: Are you working on it alone or is there a team?
  HUMAN: I'm hoping to find more people eventually.
  WORKING SOLO?: Yes

  ${dialog}
  RESPONSE:`;
};

export const procNameAndProject = (response: string) => {
  try {
    const parsed = JSON.parse(`${response}}`);

    const applicantNameValid = typeof parsed.applicantName === "string";
    const projectNameValid = typeof parsed.projectName === "string";

    return {
      ...parsed,
      applicantNameValid,
      projectNameValid,
    };
  } catch (e) {
    console.log("error parsing JSON from completion", e);
  }

  // Default / error return case.
  return {
    applicantName: "",
    projectName: "",
    applicantNameValid: false,
    projectNameValid: false,
  };
};

export default findIsSolo;
