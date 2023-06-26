import { useEffect, useState } from "react";

export function useLocalStorage(initialState, keyValue) {
  const [data, setData] = useState(function () {
    const storedData = JSON.parse(localStorage.getItem(keyValue));
    //   when the localstorage is empty => return the initial State
    if (!storedData) return initialState;
    return storedData;
  });

  useEffect(() => {
    localStorage.setItem(`${keyValue}`, JSON.stringify(data));
  }, [keyValue, data]);

  return [data, setData];
}
