import { useCallback, useState } from "react";

const LIMIT = 10;

export const useShowMore = (
  customLimit?: number
): {
  handleShowMore: () => void;
  limit: number;
} => {
  const initialLimit = customLimit ?? LIMIT;
  const [limit, setLimit] = useState<number>(initialLimit);

  const handleShowMore = useCallback(
    () => setLimit(limit + (customLimit ?? LIMIT)),
    [customLimit, limit]
  );

  return {
    handleShowMore,
    limit,
  };
};
