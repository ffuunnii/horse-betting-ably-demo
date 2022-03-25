import Ably from "ably/promises";
const url = require('url');

export default async function handler(req, res) {
    const client = new Ably.Realtime(process.env.ABLY_API_KEY);
    const queryObject = url.parse(req.url, true).query;
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: queryObject.clientId });
    res.status(200).json(tokenRequestData);
};