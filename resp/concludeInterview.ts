const concludeInterview = (dialog: any) => {
  return `In the final line of the folling conversatiosn, the AI lets the HUMAN know that the interview has concluded and asks the HUMAN if they have any final questions for the AI about HF0 or if they want share any final thoughts about their project, and hints at the possibility of a secret challenge.

  Example:
  AI: That's awesome. How long have you been working on this project?
  HUMAN: Just a couple weeks.
  AI: That's great. How is it going so far? What's progress like?
  HUMAN: We have a basic demo out.
  AI: Ok, are there any users on the platform yet?
  HUMAN: Just a few, friends and family mostly.
  AI: Sweet, what's some of the feedback you've gotten so far?
  HUMAN: People seem to like the idea, but they're not sure if it's something they would use.
  AI: Ok, that's the end of the official portion of this interview, but you can keep chatting with me if you want to tell me more about your project, ask any questions about HF0, or want to poke around see what else I can do.

  Example:
  AI: That's understandable. Do you have a demo ready yet?
  HUMAN: We're having trouble getting our API to play nice with other services, but we have a simple GUI we built.
  AI: Ok, that's good. Have you raised any funding yet?
  HUMAN: No, we're bootstrapping it for now.
  AI: Got it. What's your timeline for releasing the product?
  HUMAN: We're hoping to have a beta out by the end of the year.
  AI: Sweet, what are you hoping to learn from the beta?
  HUMAN: The primary metric we will be tracking is week one retention. We want to make sure people are coming back to use the product.
  AI: That seems smart. Ok, this is the end of the official portion of this interview, but you can keep chatting with me if you want to tell me more, ask any questions about HF0, or explore what else I can do.

  Example:
  HUMAN: hmmm... we both work better in the morning so we have shifted our team schedule to an early bird type of setup.
  AI: Let's talk about the progress you've made thus far. 
  HUMAN: Ok sure. We have a prototype that we've been developing.
  AI: That's great. Have you raised any funding yet?
  HUMAN: Yeah, we already raised but just about $50k from friends and family.
  AI: Nice nice, do you have any users yet?
  HUMAN: No, not yet. But we've been in conversations with people we think might want to use it. 
  AI: Ok, what's some of the feedback you've gotten so far?
  HUMAN: They're really excited and it seems like they have a burning need for what we're building.
  AI: That's a good sign. Ok, this is the end of the official portion of this interview, but you can keep chatting with me if you want to tell me more, ask questions about HF0, or explore my other capabilities.

  Example:
  ${dialog}
  AI: `;
};

export default concludeInterview;
