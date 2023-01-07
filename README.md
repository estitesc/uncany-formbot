# uncany-formbot
boilerplate for a modular FSM chatbot to replace a form, access via a web GUI or Twilio SMS

MORE ON THIS

Building Blocks of LLM Based Chatbots: Using Responders and Interpreters to Build a Simple FSM Chatbot

If you want to build a chatbot with an LLM you'll likely start with a pattern that I'm calling a Responder. A responder is a prompt that gives some instructions and then feeds in a dialog buffer, requesting that the next line of dialog be filled in. 

Here's an example of a basic responder:

"""
The AI and the HUMAN are having a conversation about life, liberty and the pursuit of happiness. The AI keeps asking funny questions in response to everything the HUMAN says.

AI: So what even IS democracy?
HUMAN: lol how should I know
AI: How should you know ANYTHING you're free to be dumb?
HUMAN: haha what?
AI: What indeed? What Indeed?
HUMAN: I thought you were supposed to be an Americana bot.
AI:
"""

You could use this prompt with a davinci GPT-3 model and get a good response with a stop token of "HUMAN". The dialog buffer at the end of the prompt is pulled in from your data. You could pass in as much dialog history as you want in that buffer up to the token limit for the LLM you are using. 

You're probably familiar with this basic type of chatbot prompting. It's pretty good if you mainly need to give the AI some kind of loose agenda, a personality, or allow it to reference a body of static knowledge, as all of that could be added to the prefix [could add examples of each of these]

However, this type of prompt hits some limits, for one, if you want it to remember more of the conversation and you choose a long dialog buffer length, the content of the dialog buffer will take up more and more of the prompt and eventually the convo can "run away" pretty far from the direction the prefix is setting. This is not always a problem, but for our purposes in trying to build direct dialog agents, we don't want run away behavior.

One approach to improve performance is to create a few-shot based responder that gives examples of the types of conversations the AI should be trying to have with the human. 

Here's an example:

"""
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
"""

In the above example I've replaced the active dialog buffer with ${dialog} indicating that in your prompt composition code you'd inject that compiled buffer there. 

With the few-shot dialog responder, we now are being much more prescriptive about the types of conversations that the AI should have with the user. This doesn't totally solve the runaway problem though, but especially if we use a shorter dialog buffer, it controls it more than in our initial zero-shot example. 

Another consequence of the few-shot example is that we've now limited the scope of our conversation somewhat to the few questions that fit well into a series of few shot examples. In LM's with large token limits we can surely add quite a bit more than in my example, but if you want to cover a range of few-shot examples, it does start to add up and create a long prompt. 

So we gained specificity with the few-shot but we lost a bit of open-endedness, and we've narrowed the scope considerably. One logical next step is to consider whether you might use a series of few-shot based responders. That way, you can ask a certain series of questions or cover some series of topics until you're ready to move on, then focus on the AI on a different set of examples. 

In essence, we want to create a finite state machine of prompts to direct the flow of our chatbot. But how will we know when we've met the conditions to change our state in the FSM? 

This is where interpreters come into play. 

An interpreter is another type of prompt, not designed to generate a line of dialog but rather to analyze the existing dialog and extract certain entities or semantic features which can then be considered in the heuristic application logic, for example to set a value in a database, or advance the chatbot's FSM state.

Interpreters are best when outputting JSON. This JSON must then be parsed and validated to ensure that it's not corrupted, etc.

Here's an example of just the prompt piece of an interpreter:

"""
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
"""

In this case, we are just looking for one property, "hasTeam" but you could imagine looking for more. 

This interpreter allows you to do things like "ask about the user's business until they have expressed to raise more funding, then switch to "ptich my firm" mode. 

Combining responders and interpreters allows you to essentially "script" the conversation the AI will have with the user and use the yield to take actions in other API's etc, after you get entities back from the interpreter.
