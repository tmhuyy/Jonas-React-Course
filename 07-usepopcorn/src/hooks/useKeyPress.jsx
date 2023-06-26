import { useEffect } from "react";
export function useKeyPress(action, callback) {
  useEffect(() => {
    document.addEventListener(action, callback);
    return () => {
      document.removeEventListener(action, callback);
    };
  }, [action, callback]);
}
