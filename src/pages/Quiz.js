import React, {useContext, useEffect, useState} from 'react'
import axios from "axios"
import {
    NavLink
} from "react-router-dom";
import {motion} from 'framer-motion'
import App, {nameAvatarContext} from '../App'
import {soundContext} from "../App";
import StartMenu from "./StartMenu";
//--------------------------SFX Imports---------------------------------
import {Howl} from "howler";
import swordSFX from "../audioclips/SwordPullOut.mp3";
import fail from "../audioclips/awh-disappointed-crowd-sound-effect.mp3"
import clock from "../assets/clock.png"
import gollem from "../assets/Gollum.png"
//------------------------------Code-----------------------------------
const apiKey = 'PQhSLtNXHWFFaBqgDe0y'
export default function Quiz(props) {

    //--------------------ten zijde gelaten code-----------------------
    // React.useEffect(() => {
    //     const headers = {
    //         'Accept': 'application/json',
    //         'Authorization': `Bearer ${apiKey}`
    //     }
    //     const fetchData = async () => {
    //         const rawQuotes = await fetch('https://the-one-api.dev/v2/quote', {
    //             headers: headers
    //         })
    //         const quotes = await rawQuotes.json();
    //         const quote = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
    //         setQuote(quote.dialog)
    //         const rawCharacters = await fetch('https://the-one-api.dev/v2/character?_id=' + quote.character, {headers: headers})
    //         const characters = await rawCharacters.json();
    //         const character = characters.docs[0];
    //         setCharacter(character.name)
    //     };
    //     console.log("Dit is FetchData: ", fetchData())
    //     fetchData();
    // }, []);


//----------------------useStates and useContexts----------------------
    const [quote, setQuote] = useState()
    const [character, setCharacter] = useState();
    const [score, setScore] = useState(0);
    const [showFact, setShowFact] = useState(true);
    const [counter, setCounter] = useState(30);
    const [characters, setCharacters] = useState(null)

    const nameAvatarValue = useContext(nameAvatarContext);
    const soundToggleMute = useContext(soundContext)


//----------------------useEffect API Mounting-------------------------

    console.log("Wat is de state: ", characters)

    useEffect(() => {
        console.log("ON MOUNT: ")
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }

        async function fetchData() {
            // const responseMovie = await axios.get("https://the-one-api.dev/v2/movie", {
            //     headers: headers
            // });
            // console.log(responseMovie);

            console.log("ASYNC Function: ")
            const responseCharacterGollem = await axios.get("https://the-one-api.dev/v2/character/", {
                headers: headers
            });
            console.log("Dit word in de state gezet: ", responseCharacterGollem.data.docs);
            setCharacters(responseCharacterGollem.data.docs);



        }

        console.log("Fetchdata: ")
        fetchData();



    }, [])
    // const Gollum = characters && characters.find(function (character) {
    //     if (character._id === "5cd99d4bde30eff6ebccfe9e")
    //         console.log("Find functie getriggered", Gollum)
    //     return true;
    // });
    function isGollum (character) {
        return character._id === "5cd99d4bde30eff6ebccfe9e"
    }
    const Gollum =  characters ? (characters.find(isGollum)) : (<h1>Loading...</h1>)
    console.log("Rendered Find Function", characters.find(isGollum));





//----------------------SoundEffect Variables----------------------
    const sound2 = new Howl({
        src: [fail],
        autoplay: false,
        volume: 0.2,

    })
    const sound1 = new Howl({
        src: [swordSFX],
        autoplay: false,
        volume: 0.2,

    })

//----------------------Questions and facts arrays------------------
    const facts = [
        {
            fact: <div className="fact1">
                <h2 className="fact-thirdItem">Gollem, originally knows as Sméagol (or Trahald), was at first a Stoor,
                    on of the three early hobbit types.</h2>
                <img id="Gollum-img" className="fact-firstItem" src={gollem} alt="Image Not Available"/>
                <div className="fact-secondItem" style={{fontSize: 30}}>
                </div>
                <div>{characters ? (<> {console.log("characters = true in facts")}
                    <div>Name: <span style={{fontWeight: "bold"}}>{Gollum.name}</span></div>
                    <div>Date of Birth: <span style={{fontWeight: "bold"}}>{Gollum.birth}</span></div>
                    <div>Date of Death: <span style={{fontWeight: "bold"}}>{Gollum.death}</span></div>
                    <div>Race: <span style={{fontWeight: "bold"}}>{Gollum.race}</span></div>
                </>) : (console.log("characters = false in Facts"), <h1>Loading...</h1>)}</div>
            </div>
        },
        {fact: "Fact2"},
        {fact: "Fact3"},
        {fact: "Fact4"},
    ]

    const questions = [
        {
            questionText:
                <div className="">
                    <motion.div
                        initial={{scaleY: 0}}
                        animate={{scaleY: 1}}
                        exit={{scaleY: 0}}
                    >
                        <h2>In LOTR, what does 'Gollum' say when he freaks out again?</h2>
                        <div style={{padding: 20}}>
                        </div>
                    </motion.div>
                </div>,
            answerOptions: [
                {answerText: "FCKING HELP", isCorrect: true},
                {answerText: "IM DYING", isCorrect: false},
                {answerText: "GOLEM", isCorrect: false},
                {answerText: "FILTHY HOBBITS", isCorrect: false},
            ]
        },
        {
            questionText: <div>
                <h2>This is question #2</h2>
            </div>,
            answerOptions: [
                {answerText: "answer #1", isCorrect: false},
                {answerText: "answer #2", isCorrect: true},
                {answerText: "answer #3", isCorrect: false},
                {answerText: "answer #4", isCorrect: false},
            ]
        },
        {
            questionText: <div>
                <h2>This is question #3</h2>
            </div>,
            answerOptions: [
                {answerText: "Answer 1", isCorrect: false},
                {answerText: "Answer 2", isCorrect: false},
                {answerText: "Answer 3", isCorrect: true},
                {answerText: "Answer 4", isCorrect: false},
            ]
        },
        {
            questionText: <div>
                <blockquote>{quote}</blockquote>
                <cite>- {character}</cite>
            </div>,
            answerOptions: [
                {answerText: "Answer 1", isCorrect: false},
                {answerText: "Answer 2", isCorrect: false},
                {answerText: "Answer 3", isCorrect: false},
                {answerText: "Answer 4", isCorrect: true},
            ]
        },
    ]

//----------------------Question Logics--------------------------------
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [showScore, setShowScore] = useState(false);


    const handleAnswerButtonClick = (isCorrect) => {
        if (isCorrect === true) {
            soundToggleMute.sound && sound1.play()
        } else {
            soundToggleMute.sound && sound2.play()
        }


        if (isCorrect === true) {
            setScore(score + 10);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setCounter(30)
        } else {
            setShowScore(true);
        }

        setCurrentQuestion(nextQuestion);
        if (nextQuestion < facts.length) {
            setShowFact(true)
        } else {
            setShowFact(false)
        }

    }
//----------------------Timer-----------------------------------
//     React.useEffect(() => {
//         const timer =
//             counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
//             if (counter === 0) {
//                 const nextQuestion = currentQuestion + 1;
//                 if (nextQuestion < questions.length) {
//                     setCurrentQuestion(nextQuestion);
//                     setCounter(30)
//                 } else {
//                     setShowScore(true);
//                 }
//                 setCurrentQuestion(nextQuestion);
//                 if (nextQuestion < facts.length) {
//                     setShowFact(true)
//                 } else {
//                     setShowFact(false)
//                 }
//             }
//         return () => clearInterval(timer) ;
//     }, [counter]);

//----------------------Display-------------------------------------
    return (
        <>
            <motion.div
                initial={{scaleY: 0}}
                animate={{scaleY: 1}}
                exit={{scaleY: 0}}
            >
                <div className="randomFact">
                    {showFact ? (<>
                            <h1 className="timerIcon-Facts"><img id="timerIcon" src={clock} alt=""/> {counter}</h1>

                            {characters ? (<div
                                className="question-text">{console.log("Rendered Return Facts Elements: ")}{facts[currentQuestion].fact}</div>) : (
                                <h1>loading</h1>)}

                            <button className="showFactQuestionButton" onClick={() => setShowFact(false)}>Show
                                Question
                            </button>
                        </>
                    ) : (
                        <div className="questionLayout">
                            {showScore ? (
                                <>
                                    <h1>{nameAvatarValue.name}{nameAvatarValue.avatar}</h1>
                                    <p id='scoreEnding' className="score-section">You scored {score} out
                                        of {questions.length * 10} points!</p>
                                    <NavLink to="/">
                                        <button className="mainButtonStyling">back</button>
                                    </NavLink>
                                </>

                            ) : (
                                <>
                                    <div className="question-section">

                                        <div id="playerNamePosition">
                                            <h1>{nameAvatarValue.name}{nameAvatarValue.avatar}</h1>
                                        </div>

                                        <div id="timerIconPosition">
                                            <h1><img id="timerIcon" src={clock} alt=""/> {counter}</h1>
                                        </div>

                                        <div id="livesPosition">
                                            <h1 id="livesStyling">Lives: N.A. </h1>
                                        </div>

                                        <div id="scorePosition">
                                            <h1 id="scoreStyling">Score: {score}</h1>
                                        </div>
                                    </div>


                                    <div className="question-count">
                                        <span
                                            style={{fontSize: 35}}>Question {currentQuestion + 1}/{questions.length}</span>
                                    </div>
                                    <div className="">{questions[currentQuestion].questionText}</div>

                                    <div id="showFactQuestionPosition">
                                        <button className="showFactQuestionButton"
                                                onClick={() => setShowFact(true)}>Show Fact
                                        </button>
                                    </div>

                                    <div className="answer-section">
                                        {questions[currentQuestion].answerOptions.map((answerOption) =>
                                            <button className="quizButtonStyling"
                                                    onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>{answerOption.answerText}</button>)}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

            </motion.div>
        </>

    )
}