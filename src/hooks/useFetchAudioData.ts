import { useCallback, useState } from "react";

interface UseFetchAudioDataReturn {
  fetchAudioData: (
    originUrl: string,
    message: string,
    ctx: AudioContext
  ) => Promise<AudioBuffer>;
  loading: boolean;
}

export const useFetchAudioData = (): UseFetchAudioDataReturn => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAudioData = useCallback(
    async (
      originUrl: string,
      message: string,
      ctx: AudioContext
    ): Promise<AudioBuffer> => {
      await setLoading(true);
      const rawData = await fetch(`${originUrl}/api/voicevox`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });
      const rawAudio = await rawData.arrayBuffer();

      setLoading(false);
      return await ctx.decodeAudioData(rawAudio);
    },
    []
  );

  return {
    fetchAudioData,
    loading,
  };
};
