import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const result = {
    message: "success",
  };
  res.status(200).send(result);
};

export default handler;
