import { useCallback, useState } from "react";
import useSWR from "swr";
import client from "../../lib/client";

export const useGetAllStaffs = () => {
  const { ...rest } = useSWR("/user");

  return { ...rest };
};

export const useGetAllProducts = () => {
  const { ...rest } = useSWR("/product");

  return { ...rest };
};

export const useDeleteStaff = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (userId) => {
    try {
      setIsValidating(true);
      const { data } = await client.delete(`/user/${userId}`);
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

export const useDeleteProduct = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (userId) => {
    try {
      setIsValidating(true);
      const { data } = await client.delete(`/product/${userId}`);
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

export const useEditStaff = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (userId, payload = {}) => {
    try {
      setIsValidating(true);
      const { data } = await client.patch(`/user/${userId}`, payload);
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

export const useEditProduct = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (productId, payload = {}) => {
    try {
      setIsValidating(true);
      const { data } = await client.patch(`/product/${productId}`, payload);
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

export const useCreateStaff = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (payload = {}) => {
    try {
      setIsValidating(true);
      const { data } = await client.post(`/auth/register`, payload);
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

export const useCreateProduct = () => {
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [isValidating, setIsValidating] = useState(false);

  const execute = useCallback(async (payload = {}) => {
    try {
      setIsValidating(true);
      const { data } = await client.post(`/product`, payload);
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
