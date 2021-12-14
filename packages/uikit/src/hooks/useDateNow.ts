import { useEffect, useState } from "react";

// Defines the refresh rate how often the component should update. If `false` it is disabled
type TickInterval = number | false;

/**
 * Triggers a callback with the current Date.now() value once in a tickInterval.
 * @param callback state setting callback update the current `now`
 * @param tickInterval refresh rate how often the component should update.
 */
export const useDateNowEffect = (
  callback: (now: number) => void,
  tickInterval: TickInterval = 1000
): void => {
  useEffect(() => {
    let tickId = NaN;
    let lastNow = NaN;
    if (tickInterval === false) {
      return;
    }
    const update = (): void => {
      const now = Date.now();
      const firstTick = isNaN(lastNow);
      const exceededTickInterval = now >= lastNow + tickInterval;
      if (firstTick || exceededTickInterval) {
        lastNow = now;
        callback(now);
      }
      updateTick();
    };

    const updateTick = (): void => {
      tickId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(tickId);
  }, [callback, tickInterval]);
};

export const useDateNow = (tickInterval: TickInterval = 1000): number => {
  const [now, setNow] = useState(Date.now());
  useDateNowEffect(setNow, tickInterval);

  return now;
};
