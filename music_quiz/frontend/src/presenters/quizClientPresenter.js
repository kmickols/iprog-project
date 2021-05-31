import React from "react";
import {answerQuestion, getQuestion} from "../components/roomAPI";
import Loading from "../views/loading";
import ClientInputQuestion from "../views/clientInputQuestion";
import Intermission from "../views/intermission";
import GameOver from "../views/gameOver";

export default function QuizClientPresenter(props) {
    const model = props.model

    const [question, setQuestion] = React.useState(null)

    const [questionPromise, setQuestionPromise] = React.useState(null)
    const [questionError, setQuestionError] = React.useState(null)
    const [questionAnswered, setQuestionAnswered] = React.useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(-1)
    const [answers, setAnswers] = React.useState([])
    const [showResult, setShowResult] = React.useState(false)
    const [answerMessage, setAnswerMessage] = React.useState("")
    const [seconds, setSeconds] = React.useState(30)

    function answer(arr){
        setAnswers(arr)
        model.getAnswerQuestion(arr, currentQuestionIndex)
            .then(dt => {
                if (dt.status === -1) {
                    //Answered too late!
                    setAnswerMessage("Too slow :( Better luck next time!")
                } else {
                    model.addScore(dt.score)
                    if(dt.score > 0) {
                        setAnswerMessage("Good job! You got " + dt.score + " points!")
                    } else {
                        setAnswerMessage("That was not correct, no points :( Better luck next time!")
                    }
                }
            })
            .catch(er => console.error("Error while answering question or adding score!" + er))
        setQuestionAnswered(true)
    }

    function timeout(){
        if (!questionAnswered) {
            setAnswerMessage("Too slow, no points :( Better luck next time!")
            setQuestionAnswered(true)
        }
    }

    React.useEffect(
        () =>  {
            let interval = setInterval(() => {
                setSeconds(seconds - 1)
                if(seconds - 1 === 0){
                    timeout()
                }

                if(seconds < 1 && !showResult) {
                    // Check if there's a new question
                    setQuestionPromise(model.getQuestion())
                }
            }, 1000)
            return () => {
                clearInterval(interval)
            }
        }
    )

    React.useEffect(function () {
            const prevQuestion = question
            setQuestionError(null)
            if (questionPromise) {
                const p = questionPromise
                questionPromise.then(dt => {
                    if (questionPromise === p) {
                        if (dt === -1) {
                            props.history.push("/room/" + model.getRoom() + "/result")
                        } else {
                            if (!prevQuestion || dt.index !== prevQuestion.index) {
                                setQuestionAnswered(false)
                                setAnswers([])
                                setCurrentQuestionIndex(dt.index)
                                setQuestion(dt)
                                setSeconds(30)
                            }
                        }
                    }
                }).catch(er => {
                        if (questionPromise === p) {
                            setQuestionError(er)
                        }
                    }
                )
            }
        }, [questionPromise]
    )

    React.useEffect(function () {
        setQuestionPromise(model.getQuestion())
    }, [])

    if(!questionError) {
        if (showResult) {
            return <GameOver {...props} score={model.score}/>
        } else if (question) {
            if (questionAnswered) {
                return <Intermission message={answerMessage} answers={answers} score={model.score}
                                     player={model.nickname}/>
            } else {
                return <ClientInputQuestion question={question}
                                            score={model.score}
                                            player={model.nickname}
                                            questionAnswered={questionAnswered}
                                            answer={answer}
                                            answers={answers}
                                            remainingSeconds={seconds}

                />
            }
        } else {
            return <Loading/>
        }
    } else {
        model.setErrMessage("Couldn't load questions.")
        props.history.push("/error")
        return <Loading/>
    }
}