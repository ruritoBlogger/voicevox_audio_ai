import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import { execSync } from "child_process";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // TODO: 環境変数からデータ取ってくる
  const queryResult = await fetch(
    `http://voicevox:50021/audio_query?speaker=1&text=${req.body.message}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const parsedData = await queryResult.json();
  console.log(parsedData);

  const talkResult = await fetch(`http://voicevox:50021/synthesis?speaker=1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedData),
  });

  const arrayBuffer = await talkResult.arrayBuffer();
  const buffer = await Buffer.from(arrayBuffer);
  res.setHeader("Content-Type", "audio/wav");
  res.setHeader("Content-Length", buffer.length);
  res.setHeader("Content-Disposition", "attachment; filename=audio.wav");
  res.send(buffer);
};

export default handler;
