import { useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
    const [user, setUser] = useState(() => {

        const userData = localStorage.getItem(key);

        return userData ? JSON.parse(userData) : defaultValue;
    });

    const setLocalStorage = (newUser) => {
        localStorage.setItem(key, JSON.stringify(newUser));

        setUser(newUser);
    }

    return [user, setLocalStorage];
}