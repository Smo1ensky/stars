import React, { useEffect, useRef, useReducer } from "react";
import {StopWatchContainer} from './style'

export default function StopWatch() {
    const { second, start, pause, stop } = useStopwatch();
    return (
        <StopWatchContainer>
            <h3>Stopwatch</h3>
            <h1>{second}</h1>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={stop}>Stop</button>
        </StopWatchContainer>
    );
}

const useStopwatch = () => {
    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case "START":
                    return { ...state, started: true };
                case "PAUSE":
                    return { ...state, started: false };
                case "STOP":
                    return { ...state, started: false, second: 0 };
                case "STEP":
                    return {
                        ...state,
                        second: state.second + 1
                    };
                default:
                    return state;
            }
        },
        {
            second: 0,
            started: false
        }
    );

    const intervalRef = useRef();

    const { second, started } = state;

    useEffect(
        () => {
            if (started) {
                const id = setInterval(() => {
                    dispatch({ type: "STEP" });
                }, 1000);
                intervalRef.current = id;
            }
            return () => clearInterval(intervalRef.current);
        },
        [started]
    );
    return {
        second,
        start: () => dispatch({ type: "START" }),
        pause: () => dispatch({ type: "PAUSE" }),
        stop: () => dispatch({ type: "STOP" })
    };
};

