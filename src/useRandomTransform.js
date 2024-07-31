import { useCallback } from "react";

const useRandomTransform = () => {
    const scales = [
        'scale-120', 'scale-100', 'scale-105', 'scale-110', 'scale-125'
    ];
    const rotates = [
        'rotate-0', 'rotate-1', 'rotate-2', 'rotate-3', 'rotate-6', 'rotate-12'
    ];
    const translateXs = [
        'translate-x-3', 'translate-x-7', 'translate-x-8', 'translate-x-6'
    ];
    const translateYs = [
        '-translate-y-6', '-translate-y-5', '-translate-y-7', '-translate-y-8', 'translate-y-2', 'translate-y-3', 'translate-y-1',
    ];

    const getRandomClass = useCallback((arr) => arr[Math.floor(Math.random() * arr.length)], []);

    const getRandomTransform = useCallback(() => {
        return `${getRandomClass(scales)} ${getRandomClass(rotates)} ${getRandomClass(translateXs)} ${getRandomClass(translateYs)}`;
    }, [getRandomClass, scales, rotates, translateXs, translateYs]);

    return getRandomTransform;
};

export default useRandomTransform;