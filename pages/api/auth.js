import Ably from "ably/promises";

export default async function handler(req, res) {
    // try {
    //   const client = new Ably.Realtime(process.env.ABLY_API_KEY);
    //   const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'ably-nextjs-demo' });
    //   res.status(200).json(tokenRequestData);
    // } catch (error) {
    //   res.status(200).send(error.stack);
    // }

    res.status(200).json({test: "test", ablykey: process.env.ABLY_API_KEY});
  };