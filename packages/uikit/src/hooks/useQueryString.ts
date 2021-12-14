import { useLocation } from "react-router-dom";

export const useQueryString = (): URLSearchParams => {
  const { search } = useLocation();

  return new URLSearchParams(search);
};

export const useQueryObject = (): Record<string, string> => {
  const query = useQueryString();

  return [...query.entries()].reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};
