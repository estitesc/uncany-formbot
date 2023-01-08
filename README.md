# uncany-formbot
boilerplate for a modular FSM chatbot to replace a form, access via a web GUI or Twilio SMS

# Building Blocks of LLM Based Chatbots
Using Responders and Interpreters to Build a Simple FSM Chatbot

If you want to build a chatbot with an LLM you'll likely start with a pattern that I'm calling a Responder. A responder is a prompt that gives some instructions and then feeds in a dialog buffer, requesting that the next line of dialog be filled in. 

# Zero-shot Responder:

```
The AI and the HUMAN are having a conversation about life, liberty and the pursuit of happiness. The AI keeps asking funny questions in response to everything the HUMAN says.

AI: So what even IS democracy?
HUMAN: lol how should I know
AI: How should you know ANYTHING you're free to be dumb?
HUMAN: haha what?
AI: What indeed? What Indeed?
HUMAN: I thought you were supposed to be an Americana bot.
AI:
```

You could use this prompt with a davinci GPT-3 model with stop sequence of "HUMAN" and get a good response. The dialog buffer at the end of the prompt is pulled in from your user's most recent conversation history. You could pass in as much dialog history as you want in that buffer up to the token limit for the LLM. 

You're probably familiar with this basic type of chatbot prompting. It's pretty good if you mainly need to give the AI some kind of loose agenda, a personality, or allow it to reference a body of static knowledge, as all of that could be added to the prefix.

However, this type of prompt hits some limits, for one, if you want it to remember more of the conversation and you choose a long dialog buffer length, the content of the dialog buffer will take up more and more of the prompt and eventually the convo can "run away" pretty far from the direction the prefix is setting. This is not always a problem, but for our purposes in trying to build direct dialog agents, we don't want run away behavior.

One approach to improve performance is to create a few-shot based responder that gives examples of the types of conversations the AI should be trying to have with the human. 

# Few-shot Responder:

```
The AI in the following conversations wants to learn about the Team that the user is on, and so it will change the course of the conversation to ask questions.

Example:

AI: What makes you the right team to solve this problem?
HUMAN: We have a team of experienced traders, engineers, and AI experts who have come together to create a platform that will help make trading easier.
AI: So you have some co-founders?
HUMAN: Yes, we have 3 co-founders.
AI: What are their names and roles?

Example:

HUMAN: I've been in the robotics industry for 3 years.
AI: Cool, and are you working with anyone else?
HUMAN: Yeah, I have a co-founder?
AI: Tell me about your co-founder. What's their name, and what role do they play?
HUMAN: Dylan is the CTO. He is handling the backend development. Even though I'm CEO, I also work on the codebase.
AI: Cool, how long have you known one another?

Example:

HUMAN: We have a lot of experience in AI.
AI: You're saying We so does that mean you have a co-founder?
HUMAN: Yep, I'm working with Margaret.
AI: nice, what are each of your roles?
HUMAN: I'm CEO and she's CTO.
AI: Cool, how long have you known each other?
HUMAN: We've known each other for 5 years.
AI: Wow, that's pretty long. How did you meet?

Example:

${dialog}
AI:
```

In the above example I've replaced the active dialog buffer with ${dialog} indicating that in your prompt composition code you'd inject that compiled buffer there. 

With the few-shot dialog responder, we now more prescriptive about the types of conversations that the AI should have with the user. This doesn't totally solve the runaway problem, but especially if we use a shorter dialog buffer, it controls it more than in our initial zero-shot example. 

Another consequence of the few-shot example is that we've now limited the scope of our conversation somewhat to the few questions that fit well into a series of few-shot examples. In LM's with large token limits we can surely add quite a bit more than in my example, but if you want to cover a range of few-shot examples, it does start to add up and create an overly long prompt. 

So we gained specificity with the few-shot but we lost open-endedness, and we've narrowed the scope considerably. One logical next step is to consider whether you might use a series of few-shot based responders. That way, you can ask a certain series of questions or cover some series of topics until you're ready to move on, then focus on the AI on a different set of examples. 

In essence, we want to create a finite state machine of prompts to direct the flow of our chatbot. But how will we know when we've met the conditions to change our state in the FSM? 

This is where interpreters come into play.

# Few-shot Interpreter

An interpreter is another type of prompt, not designed to generate a line of dialog but rather to analyze the existing dialog and extract certain entities or semantic features which can then be considered in the heuristic application logic, for example to set a value in a database, or advance the chatbot's FSM state. The interpreter is similar to a slot-filler in classic dialog code, but with more flexibility. 

Interpreters are best when outputting JSON. This JSON must then be parsed and validated to ensure that it's not corrupted, etc.

Here's an example of just the prompt piece of an interpreter:

```
Find whether the HUMAN has a team member or is working alone or if you can't tell from the dialog. If they have a team member, respond with {"hasTeam": "TEAM"}, if they are alone respond with {"hasTeam": "SOLO"} and if you can't tell respond with {"hasTeam": null}.

Conversation:

HUMAN: Hi!
AI: Hey, thanks for texting me. I'm the HF0 application bot. First what's your full name?
HUMAN: My name is Amanda Jean.
AI: Hi Amanda :), and what's the name of your project or company?
HUMAN: It's called "Starlight"
AI: Can you shed some "starlight" on what it does? ;)
RESPONSE: {"hasTeam": null}

Conversation:

HUMAN: We have a lot of experience in AI.
AI: You're saying We so does that mean you have a co-founder?
HUMAN: Yep, I'm working with Jules.
RESPONSE: {"hasTeam": "TEAM"}

Conversation:

${dialog}
RESPONSE:
```

In this case, we are just looking for one property, "hasTeam" but you could ask to output a series of different values. 

This interpreter allows you to do things like "ask about the user's business until they have expressed to raise more funding, then switch to "pitch my firm" mode. 

Combining responders and interpreters allows you to "script" the conversation the AI will have with the user and use the yield to take actions in other API's etc, after you get entities back from the interpreter.

# Interpreter Output Processor

This is pretty straightforward but when you pull JSON from an interpreter prompt you should run a validator function to ensure that you got outputs in the proper format and it can be helpful to also create an `isValid` param per entity.

```
const procStartedDriving = (response: string) => {
  try {
    const parsed = JSON.parse(`${response}}`);

    const startedDrivingValid =
      typeof parsed.startedDriving === "string" &&
      ["ON", "OFF"].includes(parsed.startedDriving);

    return {
      ...parsed,
      startedDrivingValid,
    };
  } catch (e) {
    console.log("error parsing JSON from completion", e);
  }

  // Default / error return case.
  return {
    startedDriving: "",
    startedDrivingValid: false,
  };
};
```

If you look closely at what I'm parsing you'll notice that I am adding an extra close brace to the end of the completion string. That's because I used the close curly as a stop sequence for the LLM call on the interpreter. 

You could just as easily encapsulate the entire JSON in a mark like a triple quote """ and this would be more robust to things like complex JSON that might include a curly brace if you're ok adding a few more tokens to your prompt. 

# Composing the FSM Bot

Now with responders and interpreters, you've all the ingredients to put together a state based FSM bot that will go through a series of different responders in accordance with the output of the interpreters (or other heuristic factors such as timing, or interaction with external API's). 

I like to think of the composition phase as similar to building a GUI with React starting with an index page, then splitting into progressively smaller components until you reach the leaf nodes that are responsible for rendering the actual HTML. However in this case, the leaf nodes are making the language model calls and handling their responses rather than specifying HTML primitives.

Like the prompts, the handlers have certain common patterns that correspond to a responder or an interpreter, but ultimately you could handle the completion in any way you can dream up, including spinning up more language model calls, as long as you are careful not to create what could be very expensive loops.

## Leaf Nodes

Let's start with most basic leaf node (ProgramNode). This could be your entire app if you just wanted to run a single responder / interpreter. All this does is run a simple conversation asking for the user's name, then pull that name into a data store. You can't see all of that logic here but let's just look at how it will appear in the node structure code:

```
const AskName: ProgramNode = (threadProps: ThreadProps) => {
  const runLangNode = useRunLangNodeAsync(threadProps);

  return async () => {
    const generateDialog: LanguageNode = {
      promptTemplate: askNameResponder,
      gptConfig: {
        temperature: 0.9,
        max_tokens: 100,
        stop: "HUMAN",
      },
      completionHandler: sendReply,
    };

    await runLangNode(generateDialog);

    const interpretName: LanguageNode = {
      promptTemplate: nameInterpreter,
      gptConfig: {
        temperature: 0.4,
        max_tokens: 25,
        stop: "}",
      },
      completionHandler: processName,
    };

    const nameResult = await runLangNode(interpretName);
    if (nameResult.nameValid) {
      setThreadData(threadProps.id, {
        name: nameResult.name,
      });
    }
  };
};
```
The `useRunLangNodeAsync`is a special LLM caller that I built for composing these kinds of structures. It's pretty simple, just calls the LLM with the config you specify and then passes the response through a handler function, returning the output of that function for further handling in the ProgramNode.

## Parent ProgramNodes

Now you can see how we'd arrange a series of leafs to create the FSM chatbot. For example we could have a top level Root ProgramNode that routes to `AskName` if name is still not given, and otherwise moves on to `TalkAboutWeather`.

```
const Root: ProgramNode = (threadProps: ThreadProps) => {
  return async () => {
    if (
      !threadProps.threadData.name
    ) {
      await AskName(threadProps)();
    } else {
      await TalkAboutWeather(threadProps)();
    }
  };
};
```

And you could easily use this structure to build out a more complex form replacement bot that does slot-filling for a variety of values, or add heuristic logic such as "move on after staying in this convo state for 10 rounds of dialog" which is sometimes valuable to add as a backstop to slot-filling type structures since in LLM bots it's often possible for a runaway conversation to leave behind the thread that queries for the needed value.

In a future chapter, I'll dive into strategies for bringing the conversation back around to asking for the needed slot-fill value, or just to bring the conversation back into alignment with the target few-shot examples if it's starting to go rogue. 

Yay, while you'll still need to use some of the boilerplate functions that you can find in this repo to run the conversation, you now have all the tools you need to build your own multi-stage few-shot bots.

