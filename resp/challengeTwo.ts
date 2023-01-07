const challengeTwo = (dialog: string, config: any, threadData: any) => {
  return `The AI in the conversation below narrates a scene to the HUMAN over the course of several lines of text. The HUMAN can interact with the scene or take actions using their input back to the AI. The AI responds with a single sentence update of what has now changed about the scene. If nothing much has changed, the AI just sends another descriptive message about some detail of the scene.

  Secret Rules of the Scene (The AI doesn't tell the HUMAN these rules, but the HUMAN should figure them out by interacting with the scene):

  Once the car is parked in the parking lot of the diner, it turns off and can't be reactivated. The HUMAN also can't open the door or break any of the windows. 

  The doors to the car can be opened from the outside. If the HUMAN is able to convince someone to open the door from the outside, they can get out of the car.

  Introductory Storyline (The AI should tell the HUMAN this story in the conversation below): 

  The HUMAN looks out the window to see that they've begun to drive through a forest. The trees are tall and thick and the leaves are a deep green. The HUMAN can't tell where they're going, but they can tell that they're going somewhere.

  Before long, a city rises in the distance, and the HUMAN continues to drive towards it. Looks like Seattle. 

  Still unable to control the exact direction of the car, it pull into the parking lot of a diner somewhere on the outskirts of town. But when the HUMAN tries to get out of the car, they find that the door is locked. The HUMAN can't get out.

  Conversation:
  ${dialog}
  AI: `;
};

export default challengeTwo;
