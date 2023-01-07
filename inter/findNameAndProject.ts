const findNameAndProject = (dialog: string) => {
  return `
  Find the applicants name and the name of their project in the following conversations and return an object in the format {"applicantName": "", "projectName": ""}. If they are not found in the conversation, return null.

  Conversation:
  HUMAN: Hi!
  AI: Hey, thanks for texting me. I'm the HF0 application bot. First what's your full name?
  HUMAN:  My name is Amanda Jean.
  AI: Hi Amanda :), and what's the name of your project or company?
  HUMAN: It's called "Starlight"
  AI: Can you shed some "starlight" on what it does? ;)
  RESPONSE: {"applicantName": "AmandaJean", "projectName": "Starlight"} 

  Conversation:
  HUMAN: Hi!
  AI: Hey, thanks for texting me. I'm the HF0 application bot. First what's your full name?
  HUMAN:  Not telling.
  AI: Ok then what's name of your project or company?
  HUMAN: It's called "Starlight"
  AI: Can you shed some "starlight" on what it does? ;)
  RESPONSE: {"applicantName": null, "projectName": "Starlight"} 

  Conversation:
  HUMAN: Hi!
  AI: Hey, thanks for texting me. I'm the HF0 application bot. First what's your full name?
  HUMAN:  Jigby Jones
  AI: Hi Jigby :), and what's the name of your project or company?
  HUMAN: hmmmm
  AI: What's it called then? Out with it.
  HUMAN: Not gonna tell you.
  RESPONSE: {"applicantName": "Jigby Jones", "projectName": null} 

  Conversation:
  HUMAN: Hello?
  AI: Hello there. I'm the HF0 application bot. Mind sharing your full name with me?
  HUMAN: Dunzlee O'Neil
  AI: Ok nice my friend Dunzlee. What's the name of your project or company?
  HUMAN: sqrt
  AI: sqrt, got it. What kind of a project is it?
  RESPONSE: {"applicantName": "Dunzlee O'Neil", "projectName": "sqrt"}

  Conversation:
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

export default findNameAndProject;
