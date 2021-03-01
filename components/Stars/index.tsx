import React from "react";
import {StarsContainer} from "./style"
import {Context} from "../../context/Context";

interface IStar {
    num: number
}

const Star = ({num}: IStar) => {
const [score, setScore,loading]=React.useContext(Context);

    return (
        <StarsContainer>
            <div className="number" {...setTimeout(()=>{if(loading){setScore(score+num)}},5000)}>{num}</div>
        </StarsContainer>


    )

}

export default Star;

// {...requestAnimationFrame(()=>{if(loading){setScore(score+num)}})}