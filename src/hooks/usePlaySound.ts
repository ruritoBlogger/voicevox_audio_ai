import { useCallback } from "react";

interface UsePlaySoundReturn {
  playSound: (
    audioBuffer: AudioBuffer,
    audioNode: AudioBufferSourceNode,
    ctx: AudioContext
  ) => void;
}

export const usePlaySound = (): UsePlaySoundReturn => {
  const playSound = useCallback(
    (
      audioBuffer: AudioBuffer,
      audioNode: AudioBufferSourceNode,
      ctx: AudioContext
    ) => {
      audioNode.buffer = audioBuffer;
      audioNode.connect(ctx.destination);
      audioNode.start(ctx.currentTime);
    },
    []
  );

  return {
    playSound,
  };
};
