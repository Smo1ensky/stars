import Head from 'next/head'
import {Container, Square} from '../styles/style'
import Star from "../components/Stars";
import React, {useRef} from "react";
import {Context} from '../context/Context'

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

export default function Home() {
    const [score, setScore] = React.useState(0)
    const [stars, setStars] = React.useState([1])
    const [loading, setLoading] = React.useState(false)

    const intervalRef = useRef();

    React.useLayoutEffect(() => {


        if (loading) {

            const newQuantityStars = setInterval(() => {
                const quantityStars = Array.from(Array(randomStars(1, 3)).keys())
                setStars(quantityStars);

            }, 5000);
            intervalRef.current = newQuantityStars

        }
        return () => clearInterval(intervalRef.current);
        console.log(stars)
    }, [score])


    return (

        <Context.Provider value={[score, setScore, loading]}>
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
                            {stars.map((star: number) => (
                                    <div style={{
                                        display:"flow-root",
                                        transform: `translateX(${randomStars(0, 150)}px)`,
                                    }} key={star}>
                                        <Star num={randomVolume(-5, 5, 0)}/>
                                    </div>
                                )
                            )}
                        </>
                    ) : (
                        <div>Для старта нажмите кнопку "Запуск"...</div>
                    )}

                </Square>

            </Container>

        </Context.Provider>
    )
}
// export async function getStaticProps() {
//     function randomStars(min: number, max: number) {
//         // случайное число от min до (max+1)
//         let rand = min + Math.random() * (max + 1 - min);
//         return Math.floor(rand);
//     }
//
//     function randomVolume(min:number, max:number, failOn:array) {
//         failOn = Array.isArray(failOn) ? failOn : [failOn]
//         let num = Math.floor(Math.random() * (max - min + 1)) + min;
//         return failOn.includes(num) ? generateRandom(min, max, failOn) : num;
//     }
//     let numb:number = randomVolume(-5,5,0)
//     let quantityStars = Array.from(Array(randomStars(1, 3)).keys())
//     return {
//         props: {quantityStars, numb},
//         revalidate: 5,
//
//     }
// }