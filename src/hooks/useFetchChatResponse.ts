import { useCallback } from "react";

interface UseFetchChatResponseReturn {
  fetchChatGPT: (originUrl: string, message: string) => Promise<string>;
}

export const useFetchChatResponse = (): UseFetchChatResponseReturn => {
  const fetchChatGPT = useCallback(
    async (originUrl: string, message: string): Promise<string> => {
      const rawChatData = await fetch(`${originUrl}/api/chatgpt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });
      const parsedChatData = await rawChatData.json();
      return parsedChatData.message.content;
    },
    []
  );

  return {
    fetchChatGPT,
  };
};
