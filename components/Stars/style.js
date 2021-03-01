import styled from "@emotion/styled";
import {keyframes} from "@emotion/react";

const fall = keyframes`
  0% {
    
    opacity: 0;
  }
  3% {
    opacity: 0.9;
  }
  5% {
    opacity: 1;
  }
  90% {
    opacity: 0.9;
  }
  100% {
    transform: translate(0, 95vh);
    opacity: 0;

  }
`



export const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("/image/star.png") center no-repeat;
  background-size: cover;
  width: 70px;
  height: 70px;
  margin-right: 50px;
  margin-left: 50px;
  font-size: 25px;
  opacity: 0;
  font-weight: bold;
  animation: ${fall} 5s linear infinite;



`

