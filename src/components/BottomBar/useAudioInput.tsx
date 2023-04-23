import { useCallback, useState, useEffect, useMemo } from "react";

interface AudioInputReturn {
  isListening: boolean;
  message: string;
  startListening: () => void;
  stopListening: () => void;
}

export const useAudioInput = (): AudioInputReturn => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [listenMessage, setListenMessage] = useState<Array<string>>([]);
  const [listenMessageLength, setListenMessageLength] = useState<number>(0);
  const [prevListenMessage, setPrevListenMessage] = useState<string>("");
  const [recognizer, setRecognizer] = useState<any>(null);

  // @ts-ignore
  const Recognition =
    typeof window !== "undefined"
      ? window?.SpeechRecognition || window?.webkitSpeechRecognition
      : null;

  const onResult = useCallback(
    (event: any) => {
      const results = event.results;
      const resultText = results[results.length - 1][0].transcript.trim();
      if (prevListenMessage === resultText) {
        return;
      }
      if (
        results.length !== listenMessageLength &&
        results.length > 1 &&
        results[results.length - 2][0].transcript.trim() !==
          listenMessage[listenMessage.length - 1]
      ) {
        setListenMessageLength(results.length);
        setListenMessage((prev) => [
          ...prev,
          results[results.length - 2][0].transcript.trim(),
        ]);
      }
      setPrevListenMessage(resultText);
    },
    [listenMessage, listenMessageLength, prevListenMessage]
  );

  useEffect(() => {
    if (!Recognition) {
      return;
    }
    const recognizer = new Recognition();
    recognizer.lang = "ja-JP";
    recognizer.continuous = true;
    recognizer.onresult = onResult;
    setRecognizer(recognizer);
  }, [Recognition]);

  const startListening = useCallback(() => {
    if (recognizer && !isListening) {
      setListenMessage([]);
      setListenMessageLength(0);
      setIsListening(true);
      recognizer.start();
    }
  }, [isListening, recognizer]);

  const stopListening = useCallback(() => {
    if (recognizer && isListening) {
      setIsListening(false);
      recognizer.stop();
    }
  }, [isListening, recognizer]);

  const message = useMemo(() => {
    if (
      listenMessage.length === 0 ||
      listenMessage[listenMessage.length - 1] !== prevListenMessage
    ) {
      return [...listenMessage, prevListenMessage].join("、");
    } else {
      return listenMessage.join("、");
    }
  }, [listenMessage, prevListenMessage]);

  return {
    isListening,
    message,
    startListening,
    stopListening,
  };
};
