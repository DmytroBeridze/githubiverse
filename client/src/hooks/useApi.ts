import { useState } from "react";

export const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "waiting" | "loading" | "loaded" | "error"
  >("waiting");
  const [message, setMessage] = useState<string | null>(null);
  const TOKEN = process.env.TOKEN;

  const sendRequest = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body: {} | null = null,
    headers: HeadersInit = {}
  ) => {
    const options = {
      method,
      body: method !== "GET" ? JSON.stringify(body) : undefined,
      headers: {
        Authorization: `Bearer${TOKEN}`,
        "Content-type": "application/json",
        ...headers,
      },
    };
    try {
      setLoading(true);
      setStatus("loading");

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();

        throw new Error(errorData.message || "Fetch error");
      }

      const data = await response.json();
      setLoading(false);
      setStatus("loaded");

      setMessage(data.message);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setLoading(false);
        setStatus("error");
      }
    }
  };

  const clearError = () => setError(null);
  const clearMessage = () => setMessage(null);

  return {
    sendRequest,
    loading,
    error,
    status,
    message,
    clearError,
    clearMessage,
  };
};
