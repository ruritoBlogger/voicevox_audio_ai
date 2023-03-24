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

  const filePath = "tmp_voice.wav";
  const talkArrayBuffer = await talkResult.arrayBuffer();
  const talkDataView = await new DataView(talkArrayBuffer);
  fs.writeFileSync(filePath, talkDataView);
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/wav",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "audio/wav",
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
};

export default handler;
