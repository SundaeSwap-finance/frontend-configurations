import { Time } from "model/time";
import { TimeFormat } from "model/time/Time.types";
import { useRemainingTime } from "./useRemainingTime";

type TUseCountDown = TimeFormat & {
  hideCountdown?: boolean;
};

/**
 * Hook that will count down seconds towards a given end date
 * @param endDate timestamp as Date to count start from
 * @returns object with remaining time values --> {
 * days: string;
 * hours: string;
 * minutes: string;
 * seconds: string;
 * }
 */
export const useCountdown = (endDate: Date): TUseCountDown => {
  const remaining = useRemainingTime(endDate);

  if (remaining === undefined || remaining === 0) {
    const undefinedRemaining: TUseCountDown = {
      days: "0",
      hours: "0",
      minutes: "0",
      seconds: "0",
    };

    return {
      ...undefinedRemaining,
      hideCountdown: true,
    };
  }

  return Time.getRemainingTime(remaining);
};
