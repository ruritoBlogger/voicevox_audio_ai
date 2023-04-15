import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { OPENAPI_KEY } = process.env;
  // TODO: 型定義しておきたい
  const body = JSON.stringify({
    messages: [
      {
        role: "user",
        content: req.body.message,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  const result = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAPI_KEY}`,
    },
    body,
  });
  const data = await result.json();
  console.log(data);

  res.status(200).json({ message: data.choices[0].message });
};

export default handler;
