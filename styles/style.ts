import styled from '@emotion/styled'

export const Container = styled.div`
  background: url("/image/bg.png") no-repeat center;
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;

`

export const Square = styled.div`
  //border: 2px solid red;
  width: 62%;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100vh;
`

export const ButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: 170px;
`

export const ScoreContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
  background: rgba(2, 13, 24, .8);
  border-radius: 5px;
  padding: 10px;
  min-width: 75px;
`

export const Btn = styled.button`
  border: none;
  outline: none;
  border-radius: 4px;
  position: relative;
  display: inline-block;
  margin-right: 5px;
  padding: 6px 10px;
  color: #050801;
  font-size: 12px;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  letter-spacing: 1px;
  cursor: pointer;
  filter: hue-rotate(10deg);

  &:hover {
    background: #03e9f4;
    color: #050801;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 200px #03e9f4;
  }
`;