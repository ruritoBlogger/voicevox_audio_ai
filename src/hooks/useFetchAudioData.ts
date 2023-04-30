import { useCallback } from "react";

interface UseFetchAudioDataReturn {
  fetchAudioData: (
    originUrl: string,
    message: string,
    ctx: AudioContext
  ) => Promise<AudioBuffer>;
}

export const useFetchAudioData = (): UseFetchAudioDataReturn => {
  const fetchAudioData = useCallback(
    async (
      originUrl: string,
      message: string,
      ctx: AudioContext
    ): Promise<AudioBuffer> => {
      const rawData = await fetch(`${originUrl}/api/voicevox`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });
      const rawAudio = await rawData.arrayBuffer();

      return await ctx.decodeAudioData(rawAudio);
    },
    []
  );

  return {
    fetchAudioData,
  };
};
