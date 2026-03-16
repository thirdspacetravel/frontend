import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timer to update the value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If the value changes (user types again), clear the previous timer
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
