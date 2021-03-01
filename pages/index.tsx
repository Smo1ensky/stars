import Head from 'next/head'
import {Container, Square} from '../styles/style'
import React, {useRef} from "react";
import Star from '../components/Stars'

const reducer = (accumulator:number, currentValue:number) => accumulator + currentValue;
function randomStars(min: number, max: number) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function randomVolume(min: number, max: number, failOn: any) {
    failOn = Array.isArray(failOn) ? failOn : [failOn]
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return failOn.includes(num) ? randomVolume(min, max, failOn) : num;
}

export default function Home({quantityStars}) {
    console.log("server",quantityStars)
    const [score, setScore] = React.useState(0)
    const [stars, setStars] = React.useState(quantityStars)
    const [loading, setLoading] = React.useState(false)
    const intervalRef = useRef();

    React.useLayoutEffect(() => {
        if (loading) {
            let newQuantityStars = setTimeout(() => {
                let result = stars.reduce(reducer)
                setScore(result)
                let quantityStars = Array.from(Array(randomStars(1, 3)), x => randomVolume(-5, 5, 0))
                setStars(quantityStars)
                console.log("1 quantityStars:",quantityStars, "1 result:",result,"1 score", score)
            }, 4900)



        }


    }, [loading])

    React.useEffect(() => {
        if (loading) {
            let newQuantityStars = setTimeout(() => {
                let result = stars.reduce(reducer)
                setScore(score=>result+score)
                let quantityStars = Array.from(Array(randomStars(1, 3)), x => randomVolume(-5, 5, 0))
                setStars(quantityStars)
                console.log("2 quantityStars:",quantityStars, "2 result:",result,"2 score", score)
            }, 4950)
            intervalRef.current = newQuantityStars
        }
        return () => clearInterval(intervalRef.current);
    }, [stars])


    return (

        <>
            <Head>
                <title>Stars</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Container>
                <div>
                    <div style={{
                        position: "absolute",
                        right: "70px",
                        top: "10px"
                    }}>
                        <h3>Score:{score}</h3>
                    </div>
                    <button onClick={() => {
                        setLoading(!loading);
                        setScore(0)
                    }} style={{position: "absolute", right: "0"}}>Start
                    </button>
                </div>

                <Square>
                    {loading ? (
                        <>
                            {stars.map((star, index) => (
                                <div style={{
                                    display: "flow-root",
                                    transform: `translateX(${randomStars(0, 150)}px)`,
                                }} key={index}>
                                    <Star num={star}/>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div>Для старта нажмите кнопку "Запуск"...</div>
                    )}

                </Square>

            </Container>

        </>
    )
}

export async function getStaticProps() {
    function randomStars(min: number, max: number) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    function randomVolume(min: number, max: number, failOn: any) {
        failOn = Array.isArray(failOn) ? failOn : [failOn]
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        return failOn.includes(num) ? randomVolume(min, max, failOn) : num;
    }

    const quantityStars = Array.from(Array(randomStars(1, 3)), x => randomVolume(-5, 5, 0))

    return {
        props: {quantityStars},


    }
}
