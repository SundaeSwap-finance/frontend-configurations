export type TimeDifference = {
  days: number | undefined;
  hours: number | undefined;
  minutes: number | undefined;
  seconds: number | undefined;
};

export type TimeUnit = keyof TimeDifference;

export type TimeFormat = Record<TimeUnit, string>;
