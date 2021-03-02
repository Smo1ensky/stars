import React from "react";
import {StopWatchContainer} from './style'

interface IStopWatch {
    timerOn:boolean,
    setTimerOn:Function,
    time:number,
    setTime:Function
}

const stopWatch = ({timerOn,setTimerOn,time,setTime}:IStopWatch)=> {

    React.useEffect(() => {
        let interval:any = null;

        if (timerOn) {
            interval = setInterval(() => {
                setTime((prevTime:number) => prevTime + 10);
            }, 10);
        } else if (!timerOn) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerOn]);
return(
    <StopWatchContainer>
        <h3>Time</h3>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
    </StopWatchContainer>
)
}

export default stopWatch