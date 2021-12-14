import { Time } from "./Time";

describe("Time", () => {
  describe("formatTime", () => {
    it("should return a properly formatted time string", () => {
      const expected = Time.formatTime("2021-09-17");
      expect(expected).toEqual("Sep 17, 2021");
    });

    it("should return a the month only", () => {
      const expected = Time.formatTime("2021-09-17", Time.MM);
      expect(expected).toEqual("09");
    });

    it("should return an empty string if no time is given", () => {
      expect(Time.formatTime(undefined)).toEqual("");
    });
  });
});
