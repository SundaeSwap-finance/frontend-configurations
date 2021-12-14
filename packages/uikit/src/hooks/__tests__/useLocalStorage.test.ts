import { RenderResult } from "@testing-library/react-hooks";
import { act, renderHook } from "@testing-library/react-hooks/native";
import { Dispatch, SetStateAction } from "react";
import useLocalStorage from "../useLocalStorage";

describe("useLocalStorage", () => {
  const testKey = "useLocalStorage_TEST_KEY";
  const testValue1 = "Gobbledigook";
  const testValue2 = "Jiggling atoms";
  const testValue3 = "🀄";

  afterEach(() => window.localStorage.clear());

  test("should update localStorage when setting new value", () => {
    const { result } = renderHook(() => useLocalStorage(testKey));

    expect(window.localStorage.getItem(testKey)).toBeFalsy();
    expect(result.current[0]).toBeUndefined();

    act(() => {
      result.current[1](testValue1);
    });

    expect(result.current[0]).toBe(testValue1);
    expect(window.localStorage.getItem(testKey)).toBe(testValue1);
  });

  test("should set and return initialValue when provided", () => {
    const { result } = renderHook(() => useLocalStorage(testKey, testValue2));

    expect(result.current[0]).toBe(testValue2);
    expect(window.localStorage.getItem(testKey)).toBe(testValue2);

    act(() => {
      result.current[1](testValue1);
    });

    expect(result.current[0]).toBe(testValue1);
    expect(window.localStorage.getItem(testKey)).toBe(testValue1);
  });

  test("should not overwrite pre-existing value in localStorage with initialValue", () => {
    window.localStorage.setItem(testKey, testValue3);
    const { result } = renderHook(() => useLocalStorage(testKey, testValue2));
    expect(result.current[0]).toBe(testValue3);
    expect(window.localStorage.getItem(testKey)).toBe(testValue3);

    act(() => {
      result.current[1](testValue1);
    });

    expect(result.current[0]).toBe(testValue1);
    expect(window.localStorage.getItem(testKey)).toBe(testValue1);
  });

  describe("should remove value from localStorage when setValue called with a non-string value", () => {
    let result: RenderResult<[string | void, Dispatch<SetStateAction<string | void>>]>;

    beforeEach(() => {
      result = renderHook(() => useLocalStorage(testKey)).result;
      expect(window.localStorage.getItem(testKey)).toBeFalsy();
      expect(result.current[0]).toBeUndefined();

      act(() => {
        result.current[1](testValue1);
      });
      expect(result.current[0]).toBe(testValue1);
      expect(window.localStorage.getItem(testKey)).toBe(testValue1);
    });

    test("null", () => {
      act(() => {
        result.current[1](null!);
      });
      expect(window.localStorage.getItem(testKey)).toBeFalsy();
    });

    test("undefined", () => {
      act(() => {
        result.current[1](undefined);
      });
      expect(window.localStorage.getItem(testKey)).toBeFalsy();
    });

    test("function", () => {
      act(() => {
        result.current[1](() => 42 as any);
      });
      expect(window.localStorage.getItem(testKey)).toBeFalsy();
    });

    test("number", () => {
      act(() => {
        result.current[1](42 as any);
      });
      expect(window.localStorage.getItem(testKey)).toBeFalsy();
    });
  });
});
