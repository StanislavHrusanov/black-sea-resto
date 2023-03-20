import { useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {

        const storedItem = localStorage.getItem(key);

        return storedItem ? JSON.parse(storedItem) : defaultValue;
    });

    const setLocalStorage = (newItem) => {
        localStorage.setItem(key, JSON.stringify(newItem));

        setValue(newItem);
    }

    return [value, setLocalStorage];
}