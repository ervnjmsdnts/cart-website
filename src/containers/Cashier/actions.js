import { useCallback, useState } from "react";
import client from "../../lib/client";

export const useGetCart = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (code) => {
    try {
      setIsValidating(true);
      const { data } = await client.get(`/cart/${code}`);
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

export const useCompleteCheckout = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (cartId, payload = {}) => {
    try {
      setIsValidating(true);
      const { data } = await client.patch(
        `/cart/complete-checkout/${cartId}`,
        payload
      );
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
