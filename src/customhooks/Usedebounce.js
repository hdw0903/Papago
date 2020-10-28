import { useState, useEffect, useRef } from 'react';

export default function useDebounce(value, delay) {
  const timer = useRef(null);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer.current);
    };
  }, [value, delay]);

  const clearDebounce = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      setDebouncedValue(value);
    }
  };

  return [debouncedValue, clearDebounce];
}
