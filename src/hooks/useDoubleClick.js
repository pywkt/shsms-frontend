import { useState, useEffect } from 'react';

export const useDoubleClick = (singleClick, doubleClick, delay = 420) => {
    const [clickState, setClickState] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (singleClick && clickState === 1) singleClick();
            setClickState(0);
        }, delay);

        if (clickState === 2) doubleClick();

        return () => clearTimeout(timer);

    }, [clickState, doubleClick, singleClick, delay]);

    return () => setClickState(prev => prev + 1);
}