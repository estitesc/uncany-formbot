const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE;
const client = require("twilio")(accountSid, authToken);

export const sendMessage = async (message, toPhone) => {
  const response = await client.messages.create({
    body: message,
    from: `+${fromPhone}`,
    to: `+${toPhone}`,
  });

  console.log("twilio message send response", response);
  return response;
};
