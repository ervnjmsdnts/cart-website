import { useCallback, useState } from "react";
import client from "../../lib/client";

export const useLogin = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (payload = {}) => {
    try {
      setIsValidating(true);
      const { data } = await client.post("/auth/login", { ...payload });
      setResponse(data);
    } catch (e) {
      setError(e);
    } finally {
      setIsValidating(false);
    }
  }, []);

  return {
    data: response,
    error,
    isValidating,
    execute,
  };
};

export const useRegister = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (payload = {}) => {
    try {
      setIsValidating(true);
      const { data } = client.post("/auth/register", { ...payload });
      setResponse(data);
    } catch (e) {
      setError(e);
    } finally {
      setIsValidating(false);
    }
  }, []);

  return {
    data: response,
    error,
    isValidating,
    execute,
  };
};
