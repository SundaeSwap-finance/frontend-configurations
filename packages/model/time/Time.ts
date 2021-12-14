import { format } from "date-fns";
import { TimeFormat, TimeUnit, TimeDifference } from "./Time.types";

export class Time {
  static readonly MMMDYYYY = "MMM d, yyyy";
  static readonly MM = "MM";
  static readonly msPerSecond = 1000;
  static readonly msPerMinute = this.msPerSecond * 60;
  static readonly msPerHour = this.msPerMinute * 60;
  static readonly msPerDay = this.msPerHour * 24;

  static getToday(): Date {
    return new Date();
  }

  static getTodayAsTimestamp(): number {
    return Date.now();
  }

  static formatTime(str: string | undefined, timeFormat: string = Time.MMMDYYYY): string {
    if (!str) return "";

    return format(new Date(str), timeFormat);
  }

  static getRemainingTimeFromMilliseconds = (ms: number): TimeDifference => {
    let days: number | undefined;
    let hours: number | undefined;
    let minutes: number | undefined;
    let seconds: number | undefined;

    if (ms <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    while (seconds === undefined) {
      if (days === undefined) {
        days = Math.floor(ms / this.msPerDay);
        ms -= this.msPerDay * days;
      }

      if (hours === undefined) {
        hours = Math.floor(ms / this.msPerHour);
        ms -= this.msPerHour * hours;
      }

      if (minutes === undefined) {
        minutes = Math.floor(ms / this.msPerMinute);
        ms -= this.msPerMinute * minutes;
      }

      if (seconds === undefined) {
        seconds = Math.floor(ms / this.msPerSecond);
      }
    }

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  static getRemainingTime = (ms: number): TimeFormat => {
    const result = this.getRemainingTimeFromMilliseconds(ms);

    return Object.entries(result).reduce(
      (formattedResult, entry) => {
        const [key, value] = entry as [TimeUnit, number];

        formattedResult[key] = `${value}`;

        return formattedResult;
      },

      {
        days: "",
        hours: "",
        minutes: "",
        seconds: "",
      }
    );
  };
}
