import { useCallback } from "react";

interface TalkVoiceVoxProps {
  originUrl: string;
  ctx: AudioContext | null;
  playSound: AudioBufferSourceNode | null;
}

interface TalkVoiceVoxReturn {
  talkVoiceVox: (message: string) => Promise<void>;
}

export const useTalkVoiceVox = ({
  originUrl,
  ctx,
  playSound,
}: TalkVoiceVoxProps): TalkVoiceVoxReturn => {
  const fetchVoiceVoxAudoio = useCallback(
    async (message: string): Promise<ArrayBuffer> => {
      const rawData = await fetch(`${originUrl}/api/voicevox`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });
      return await rawData.arrayBuffer();
    },
    [originUrl]
  );

  const talkVoiceVox = useCallback(
    async (message: string) => {
      if (!ctx || !playSound) return;

      const rawData = await fetchVoiceVoxAudoio(message);
      const audio = await ctx.decodeAudioData(rawData);
      playSound.buffer = audio;
      playSound.connect(ctx.destination);
      playSound.start(ctx.currentTime);
    },
    [ctx, fetchVoiceVoxAudoio, playSound]
  );

  return {
    talkVoiceVox,
  };
};
