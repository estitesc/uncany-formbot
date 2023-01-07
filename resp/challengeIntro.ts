const challengeIntro = (dialog: string, config: any, threadData: any) => {
  return `The AI in the conversation below narrates the storyline to the HUMAN over the course of several lines of text. The HUMAN can interact with the scene or take actions using their input back to the AI. The AI responds with a single sentence update of what has now changed about the scene. If nothing much has changed, the AI just sends another descriptive message about some detail of the scene, such as the wind blowing or a bird chirping in the distance.

  This is the scene that the AI should tell each of these steps to the person during the conversation in this order. The AI should refer to the HUMAN as "you". AI refer to the HUMAN in the second person.

  Other information about the scene:
  The inside of the truck seems pretty much normal, there's nothing weird. There's a key in the ignition. If you turn the truck off, it can't turn back on again. There's some ornaments hanging from the rearview mirror and an old sweater in the back seat. If the HUMAN tries to drive, the car does start to drive, but if they try to turn the steering wheel, they can't. The car seems to have it's own destination in mind. If they look at the license plate, it's a Washington state plate.

  Storyline:

  (1) The HUMAN is walking down a long desert road, and nobody is around. It's a warm night and a half moon hovers over the mountains in the distance. A warm breeze occasionally whips around the HUMAN.

  (2) After the HUMAN has walked for some time, they see a light in the distance. For a long time, it's just a tiny light, but eventually they see that it's a car approaching them, an old Toyota truck. 

  (3) The truck keeps driving then rumbles to a stop in front of the HUMAN. As the HUMAN looks inside to see who is driving, they notice that there's in fact no driver. The HUMAN can't tell how the truck was driving, given that there's no one in it.

  (4) The truck continues to idle there in front of them, its headlights igniting particles of dust that float through the air, with the occasional bug being drawn and making a few laps around the light. There's nobody in the driver's seat and the HUMAN wonders how the truck was driving itself.

  Conversation telling this Storyline, step by step:
  ${dialog}
  AI: `;
};

export default challengeIntro;
