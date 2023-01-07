const findHasTeam = (dialog: string) => {
  return `
  Find whether the HUMAN has a team member or is working alone or if you can't tell from the dialog. If they have a team member, respond with {"hasTeam": "TEAM"}, if they are alone respond with {"hasTeam": "SOLO"} and if you can't tell respond with {"hasTeam": null}.

  Conversation:
  HUMAN: Hi!
  AI: Hey, thanks for texting me. I'm the HF0 application bot. First what's your full name?
  HUMAN:  My name is Amanda Jean.
  AI: Hi Amanda :), and what's the name of your project or company?
  HUMAN: It's called "Starlight"
  AI: Can you shed some "starlight" on what it does? ;)
  RESPONSE: {"hasTeam": null}

  Conversation:
  HUMAN: We have a lot of experience in AI.
  AI: You're saying We so does that mean you have a co-founder?
  HUMAN: Yep, I'm working with Margaret. 
  RESPONSE: {"hasTeam": "TEAM"}

  Conversation:
  HUMAN: I've been in the robotics industry for 3 years.
  AI: Cool, and are you working with anyone else?
  HUMAN: No I'm working alone atm
  RESPONSE: {"hasTeam": "SOLO"}

  Conversation:
  HUMAN: Hello?
  AI: Hello there. I'm the HF0 application bot. Mind sharing your full name with me?
  HUMAN: Dunzlee O'Neil
  AI: Ok nice my friend Dunzlee. What's the name of your project or company?
  HUMAN: sqrt
  AI: sqrt, got it. What kind of a project is it?
  RESPONSE: {"hasTeam": null}

  Conversation:
  ${dialog}
  RESPONSE:`;
};

export const procHasTeam = (response: string) => {
  try {
    const parsed = JSON.parse(`${response}}`);

    const hasTeamValid =
      typeof parsed.hasTeam === "string" &&
      ["TEAM", "SOLO"].includes(parsed.hasTeam);

    return {
      ...parsed,
      hasTeamValid,
    };
  } catch (e) {
    console.log("error parsing JSON from completion", e);
  }

  // Default / error return case.
  return {
    hasTeam: "",
    hasTeamValid: false,
  };
};

export default findHasTeam;
