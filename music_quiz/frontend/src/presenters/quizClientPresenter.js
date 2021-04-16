import React from "react";
import {answerQuestion, getQuestion} from "../components/roomAPI";
import Loading from "../views/loading";
import ClientInputQuestion from "../views/clientInputQuestion";
import Intermission from "../views/intermission";

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

    React.useEffect(function () {
            const prevQuestion = question
            setQuestion(null)
            setQuestionError(null)
            if (questionPromise) {
                const p = questionPromise
                questionPromise.then(dt => {
                    if (questionPromise === p) {
                        if (dt === -1){
                            setShowResult(true)
                        } else {
                            if(currentQuestionIndex === dt.index){
                                setQuestion(prevQuestion)
                            } else if(dt !== prevQuestion) {
                                setQuestionAnswered(false)
                                setAnswers([])
                                setCurrentQuestionIndex(dt.index)
                                setQuestion(dt)
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

    React.useEffect(function () { setQuestionPromise( getQuestion(props.match.params.roomCode) )}, [])

    if (showResult){
        return <span className={"main-text"}>The results are in!</span>
    } else if (question) {
        if(questionAnswered){
            return <Intermission message={answerMessage} score={model.score} player={model.nickname} next={() => setQuestionPromise(getQuestion(props.match.params.roomCode))}/>
        } else {
            return <ClientInputQuestion question={question}
                                        score={model.score}
                                        player={model.nickname}
                                        questionAnswered={questionAnswered}
                                        answer={(arr) => {
                                            setAnswers(arr)
                                            answerQuestion(props.match.params.roomCode, arr, currentQuestionIndex)
                                                .then(dt => {
                                                    if(dt.status === -1){
                                                        //Answered too late!
                                                        setAnswerMessage("You answered too late! No points :(")
                                                    } else {
                                                        model.addScore(dt.score)
                                                        setAnswerMessage("Wait for the host to show the correct answer!")
                                                    }
                                                })
                                                .catch(er => console.error("Error while answering question or adding score!" + er))
                                            setQuestionAnswered(true)
                                        }
                                        }
                                        answers={answers}

            />
        }
    } else {
        return <Loading/>
    }
}