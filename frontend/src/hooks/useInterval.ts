import { useRef, useEffect } from 'react';

// Pure Javascript Way
// export function useInterval(callback, delay) {
//     const savedCallback = useRef();
//     useEffect(() => {
//         savedCallback.current = callback;
//     }, [callback]);

//     useEffect(() => {
//         const id = setInterval(() => savedCallback.current?.(), delay);
//         return () => clearInterval(id);
//     }, [callback, delay]);
// }

export function useInterval<ReturnType>(
    callback: () => ReturnType,
    delay: number
) {
    const savedCallback = useRef(callback);

    // Update Callbackreference if callback changes
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
        const id = setInterval(() => savedCallback.current(), delay);
        return () => clearInterval(id);
    }, [callback, delay]);
}
