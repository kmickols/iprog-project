import HostInputQuestion from "../views/hostInputQuestion";
import Loading from "../views/loading";
import React from "react";
import {getQuestion, nextQuestion} from "../components/roomAPI";

export default function QuizHostPresenter(props){

    const [question, setQuestion] = React.useState(null)
    const [questionPromise, setQuestionPromise] = React.useState(null)
    const [questionError, setQuestionError] = React.useState(null)
    const [showResult, setShowResult] = React.useState(false)

    React.useEffect(function () {
            setQuestion(null)
            setQuestionError(null)
            if (questionPromise) {
                const p = questionPromise
                questionPromise.then(dt => {
                    if (questionPromise === p) {
                        console.log(dt)
                        if (dt === -1){
                            setShowResult(true)
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

    React.useEffect(function () { setQuestionPromise( getQuestion(props.match.params.roomCode) )}, [])

    if(showResult){
        return <div>Results:</div>
    } else if (question) {
        return <HostInputQuestion question={question} next={() => setQuestionPromise(nextQuestion(props.match.params.roomCode))}/>
    } else {
        return <Loading/>
    }

}