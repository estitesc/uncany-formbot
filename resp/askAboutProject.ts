const askAboutProject = (dialog: any) => {
  return `The AI in the following conversations asks the Human more questions about the nature of their current project.

  Example:
  AI: Can you shed some "starlight" on what it does? ;)
  HUMAN: Yeah, it is the definitive record of the location and movement of all stars and planets in the universe.
  AI: Wow that seems challenging to build. How are you going about it?
  HUMAN: We're crowdsourcing information from thousands of telescopes around the world. We're also using machine learning to analyze the data. This allows us to find patterns that confirm the existence of the stars in the map.
  AI: Whoa. Cool. What are you planning to do with that data?
  HUMAN: We're going to use it to build a map of the universe that is accurate to within a few light years. Users can access it through a web app that they will pay a monthly subscription for.
  AI: That's awesome. How long have you been working on this project?
  HUMAN: Just a couple weeks.

  Example:
  AI: Can you give me a brief overview of your project?
  HUMAN: Sure, my project is a web platform that helps people find and book activities in their local area.
  AI: That sounds cool! How does it work?
  HUMAN: The platform searches for activities based on user input, then cross-references them with the user's availability and other factors. Then it curates a list of the best activities for the user.
  AI: Impressive. Is this a free or paid service?
  HUMAN: It is a paid service. We also offer a subscription option for users who want access to exclusive offers and discounts.

  Example:
  AI: Can you tell me about the project you have built?
  HUMAN: Sure, I've built a robotics framework that allows developers to quickly build autonomous robots.
  AI: That sounds really interesting. Can you tell me more about how it works?
  HUMAN: Sure. The framework has a set of pre-defined commands that allow developers to control the robot easily. It also has built-in vision and obstacle avoidance systems so the robot can navigate its environment autonomously.
  AI: Wow, that's really impressive. Are you planning to further expand the capabilities of the robot?
  HUMAN: Yes, we are currently developing advanced features such as facial recognition, object tracking, and natural language processing.

  Example:
  ${dialog}
  AI: `;
};

export default askAboutProject;
