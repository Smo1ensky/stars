import Head from 'next/head'
import {Btn, ButtonContainer, Container, ScoreContainer, Square} from '../styles/style'
import React from "react";
import Star from '../components/Stars'
import StopWatch from "../components/StopWatch";
import {PositionContainer} from "../components/Stars/style";

interface IRandomVolume {
    min: number
    max: number
    failOn: number[]
}

// случайное число от min до (max+1) исключая (failOn)
const randomVolume: IRandomVolume = (min: number, max: number, failOn: number[]) => {

    failOn = Array.isArray(failOn) ? failOn : [failOn]
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return failOn.includes(num) ? randomVolume(min, max, failOn) : num;
}
// случайное число от min до (max+1)
const randomStars = (min: number, max: number) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;


interface IHome {
    quantityStars: number[]
}

const Home = ({quantityStars}: IHome) => {
    const [score, setScore] = React.useState(0)
    const [stars, setStars] = React.useState(quantityStars)
    const [loading, setLoading] = React.useState(false)
    const [pause, setPause] = React.useState(false)
    const [time, setTime] = React.useState(0);
    const [timerOn, setTimerOn] = React.useState(false);
    const [xPosition, setXPosition] = React.useState(10)


    //Считаем массив чисел с сервера
    React.useEffect(() => {
        let newQuantityStars: any = null
        if (loading) {
            let newQuantityStars = setTimeout(() => {
                let result = stars.reduce(reducer)
                setScore(score => result + score)
                let quantityStars = Array.from(Array(randomStars(1, 3)), x => randomVolume(-5, 5, 0))
                setStars(quantityStars)
                setXPosition(randomStars(0, 60))
            }, 2900)
        } else if (!loading) {
            clearTimeout(newQuantityStars)
        }
        return () => clearTimeout(newQuantityStars)
    }, [loading])


//Считаем массив чисел сгенерированный на клиенте
    React.useEffect(() => {

        if (loading) {
            let newQuantityStars = setInterval(() => {
                let result = stars.reduce(reducer)
                setScore(score => result + score)
                let quantityStars = Array.from(Array(randomStars(1, 3)), x => randomVolume(-5, 5, 0))
                setStars(quantityStars)
                setXPosition(randomStars(0, 60))

            }, 2990)

            return () => clearTimeout(newQuantityStars)
        }
    }, [stars])


    return (

        <>
            <Head>
                <title>Stars</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Container>
                <ScoreContainer>
                    <h3>Score:{score}</h3>
                    <StopWatch timerOn={timerOn} setTimerOn={setTimerOn} time={time} setTime={setTime}/>
                </ScoreContainer>
                <ButtonContainer>

                    <Btn onClick={() => {
                        setLoading(true);
                        setPause(false)
                        setTimerOn(true)
                    }}>{pause ? "Продолжить" : "Запуск"}
                    </Btn>

                    <Btn onClick={() => {
                        setPause(true);
                        setLoading(false);
                        setTimerOn(false)
                    }}>Пауза
                    </Btn>

                    <Btn onClick={() => {
                        setLoading(false);
                        setPause(false)
                        setScore(0)
                        setTime(0)
                        setTimerOn(false)
                    }}>Рестарт
                    </Btn>

                </ButtonContainer>
                <Square>
                    {loading && (
                        <>
                            {stars.map((star: number, index: number) => (
                                <PositionContainer xPosition={xPosition} key={index}>
                                    <Star num={star}/>
                                </PositionContainer>
                            ))}
                        </>
                    )}

                </Square>

            </Container>

        </>
    )
}
export default Home;

export function getStaticProps() {
    const randomStars = (min: number, max: number) => {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
    const randomVolume: IRandomVolume = (min: number, max: number, failOn: number[]) => {
        failOn = Array.isArray(failOn) ? failOn : [failOn]
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        return failOn.includes(num) ? randomVolume(min, max, failOn) : num;
    }

    const quantityStars = Array.from(Array(randomStars(1, 3)), x => randomVolume(-5, 5, 0))

    return {
        props: {quantityStars},


    }
}
