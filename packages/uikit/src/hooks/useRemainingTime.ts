import { useState, useEffect, useCallback } from "react";
import { useDateNow, useDateNowEffect } from "./useDateNow";

export const useRemainingTime = (endDate: Date, tickInterval = 1000): number => {
  const [disabled, setDisabled] = useState(false);
  const now = useDateNow(disabled ? false : tickInterval);
  const endDateTime = new Date(endDate).valueOf();

  const remaining = Math.max(0, endDateTime - now);
  const ended = remaining === 0;

  useEffect(() => setDisabled(ended), [ended]);

  return remaining;
};

export const useRemainingTimeEffect = (endDate: Date, tickInterval = 1000): number => {
  const initialNow = useDateNow();
  const endDateTime = new Date(endDate).valueOf();
  const [remaining, setRemaining] = useState(Math.max(0, endDateTime - initialNow));

  const updateRemainingTime = useCallback(
    (now: number) => {
      const newRemaining = Math.max(0, endDateTime - now);
      if (newRemaining === 0) {
        setRemaining(newRemaining);
      }
    },
    [endDateTime]
  );

  useDateNowEffect(
    updateRemainingTime,
    remaining !== 0 && !isNaN(endDateTime) ? tickInterval : false
  );

  return remaining;
};
