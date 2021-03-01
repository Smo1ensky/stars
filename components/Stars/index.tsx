import React from "react";
import {StarsContainer} from "./style"


interface IStar {
    num: number
}

const Star = ({num}: IStar) => {
    return (
        <StarsContainer>
            <div className="number">{num}</div>
        </StarsContainer>


    )

};

export default Star;
