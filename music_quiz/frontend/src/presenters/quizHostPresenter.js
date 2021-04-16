import HostInputQuestion from "../views/hostInputQuestion";
import Loading from "../views/loading";
import React from "react";
import {getQuestion, nextQuestion, revealQuestion} from "../components/roomAPI";
import InputAnswer from "../views/inputAnswer";
import Error from "../views/error";
import FinalScore from "../views/finalScore";

export default function QuizHostPresenter(props){
    const roomCode = props.match.params.roomCode

    const [question, setQuestion] = React.useState(null)
    const [questionPromise, setQuestionPromise] = React.useState(null)
    const [questionError, setQuestionError] = React.useState(null)
    const [showAnswer, setShowAnswer] = React.useState(false)

    React.useEffect(function () {
            setQuestion(null)
            setQuestionError(null)
            if (questionPromise) {
                const p = questionPromise
                questionPromise.then(dt => {
                    if (questionPromise === p) {
                        if (dt === -1){
                            props.history.push("/room/"+roomCode+"/result")
                        } else {
                            setQuestion(dt)
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

    React.useEffect(function () { setQuestionPromise( getQuestion(roomCode) )}, [])

    if(questionError){
        return <Error error={questionError}/>
    } else if (question) {
        let next
        if(!showAnswer){
            next = () => {
                setShowAnswer(true)
                revealQuestion(roomCode)
            }
            return <HostInputQuestion question={question} next={next}/>
        } else {
            next = () => {
                setQuestionPromise(nextQuestion(roomCode))
                setShowAnswer(false)
            }

            return <InputAnswer question={question} next={next}/>

        }
    } else {
        return <Loading/>
    }

}