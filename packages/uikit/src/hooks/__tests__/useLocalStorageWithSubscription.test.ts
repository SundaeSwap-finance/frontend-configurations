import { renderHook, act, RenderResult } from "@testing-library/react-hooks";
import { Dispatch, SetStateAction } from "react";
import useLocalStorageWithSubscription from "../useLocalStorageWithSubscription";

describe("useLocalStorageWithSubscription", () => {
  const testKey = "useLocalStorageWithSubscription_TEST_KEY";
  const testValue1 = "Gobbledigook";
  const testValue2 = "Jiggling atoms";
  const testValue3 = "🀄";

  afterEach(() => window.localStorage.clear());

  // provides the same functionality as `useLocalStorage`
  test("should update localStorage when setting new value", () => {
    const { result } = renderHook(() => useLocalStorageWithSubscription(testKey));

    expect(window.localStorage.getItem(testKey)).toBeFalsy();
    expect(result.current[0]).toBeUndefined();

    act(() => {
      result.current[1](testValue1);
    });

    expect(result.current[0]).toBe(testValue1);
    expect(window.localStorage.getItem(testKey)).toBe(testValue1);
  });

  test("should set and return initialValue when provided", () => {
    const { result } = renderHook(() => useLocalStorageWithSubscription(testKey, testValue2));

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
    const { result } = renderHook(() => useLocalStorageWithSubscription(testKey, testValue2));
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
      result = renderHook(() => useLocalStorageWithSubscription(testKey)).result;
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
  // End Of `useLocalStorage` functionality

  describe("should work with event subscription", () => {
    test("should handle 'local-storage' synthetic event", async () => {
      const { result } = renderHook(() => useLocalStorageWithSubscription(testKey));
      expect(window.localStorage.getItem(testKey)).toBeFalsy();
      expect(result.current[0]).toBeUndefined();
      act(() => {
        window.localStorage.setItem(testKey, testValue1);
        window.dispatchEvent(new Event("local-storage"));
      });
      expect(result.current[0]).toBe(testValue1);
    });

    test("should handle native StorageEvent ('storage') from another documents", async () => {
      const { result } = renderHook(() => useLocalStorageWithSubscription(testKey));
      expect(window.localStorage.getItem(testKey)).toBeFalsy();
      expect(result.current[0]).toBeUndefined();
      act(() => {
        window.localStorage.setItem(testKey, testValue3);
        window.dispatchEvent(new Event("storage"));
      });
      expect(result.current[0]).toBe(testValue3);
    });

    test("should dispatch 'local-storage' synthetic event, when setValue called", async () => {
      const mockedDispatchEvent = jest.fn();
      const originalDispatchEvent = window.dispatchEvent;
      window.dispatchEvent = mockedDispatchEvent;

      const { result } = renderHook(() => useLocalStorageWithSubscription(testKey));
      expect(window.localStorage.getItem(testKey)).toBeFalsy();
      expect(result.current[0]).toBeUndefined();
      act(() => {
        result.current[1](testValue2);
      });
      expect(result.current[0]).toBe(testValue2);
      expect(mockedDispatchEvent).toHaveBeenCalledTimes(1);

      window.dispatchEvent = originalDispatchEvent;
    });

    test("should work with multiple hooks", () => {
      const hook1 = renderHook(() => useLocalStorageWithSubscription(testKey));
      const hook2 = renderHook(() => useLocalStorageWithSubscription(testKey));
      const hook3 = renderHook(() => useLocalStorageWithSubscription(testKey));
      expect(window.localStorage.getItem(testKey)).toBeFalsy();
      expect(hook1.result.current[0]).toBeUndefined();
      expect(hook2.result.current[0]).toBeUndefined();
      expect(hook3.result.current[0]).toBeUndefined();

      act(() => {
        hook1.result.current[1](testValue2);
      });

      expect(window.localStorage.getItem(testKey)).toBe(testValue2);
      expect(hook1.result.current[0]).toBe(testValue2);
      expect(hook2.result.current[0]).toBe(testValue2);
      expect(hook3.result.current[0]).toBe(testValue2);

      act(() => {
        hook2.result.current[1](testValue3);
      });

      expect(window.localStorage.getItem(testKey)).toBe(testValue3);
      expect(hook1.result.current[0]).toBe(testValue3);
      expect(hook2.result.current[0]).toBe(testValue3);
      expect(hook3.result.current[0]).toBe(testValue3);
    });
  });
});
