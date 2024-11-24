import { useEffect, useRef } from "react";

const useDebounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
    callback: T,
    delay: number
) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clear = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const debouncedCallback = (...args: Parameters<T>) => {
        clear();
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    useEffect(() => {
        return () => clear();
    }, []);

    return debouncedCallback;
};

export default useDebounce;
