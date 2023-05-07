import { useCallback, useState } from "react";

interface UseFetchChatResponseReturn {
  fetchChatGPT: (originUrl: string, message: string) => Promise<string>;
  loading: boolean;
}

export const useFetchChatResponse = (): UseFetchChatResponseReturn => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchChatGPT = useCallback(
    async (originUrl: string, message: string): Promise<string> => {
      await setLoading(true);
      const rawChatData = await fetch(`${originUrl}/api/chatgpt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });
      const parsedChatData = await rawChatData.json();
      await setLoading(false);
      return parsedChatData.message.content;
    },
    []
  );

  return {
    fetchChatGPT,
    loading,
  };
};
