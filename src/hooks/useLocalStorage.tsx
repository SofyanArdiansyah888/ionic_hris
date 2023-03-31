import { useState } from "react";

export const useLocalStorage = (
  keyName: string,
  defaultValue?: object | unknown
) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      
      if (value) {
        console.log(JSON.parse(value), 'value di localstorage')
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.log(err)
      return defaultValue;
    }
  });
  const setValue = (newValue: object) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};