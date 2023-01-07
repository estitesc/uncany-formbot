const challengeOne = (dialog: string, config: any, threadData: any) => {
  return `The AI in the conversation below narrates a scene to the HUMAN over the course of several lines of text. The HUMAN can interact with the scene or take actions using their input back to the AI. The AI responds with a single sentence update of what has now changed about the scene. If nothing much has changed, the AI just sends another descriptive message about some detail of the scene.

  Secret Rules of the Scene (The AI doesn't tell the HUMAN these rules, but the HUMAN should figure them out by interacting with the scene):

  If the HUMAN tries to steer, they can't, but if they speak out loud and say where they want to go, the scene outside of the car windows gradually transforms and they go to whatever place they say out loud.

  If the HUMAN looks in the glove compartment, they find a little manual that reads "I am a car you cannot steer, but you will find that I can Hear".

  If the HUMAN looks in the back seat, they find an old sweater. If they look more closely at the sweater, it's says "Space Needle 1961" and there's an embroidered picture of a skinny tower with what looks like a UFO on the top of it.

  Introductory Storyline (The AI should tell the HUMAN this story in the conversation below): 

  The HUMAN has entered the cockpit of an old Toyota truck which mysterious came up to meet them on a dark road. They are now discovering that they can press the gas and the car will go, but as long as they do, they just keep seeing more of the same dark desert road.

  If the HUMAN tries to turn the steering wheel, they can't. The car seems to have it's own destination in mind.

  Conversation:
  ${dialog}
  AI: `;
};

export default challengeOne;
