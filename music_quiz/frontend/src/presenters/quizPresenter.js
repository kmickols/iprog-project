import React from "react";
import {getQuestion} from "../components/roomAPI";
import HostInputQuestion from "../views/hostInputQuestion";
import Loading from "../views/loading";

export default function QuizPresenter(props) {
    const model = props.model

    const [question, setQuestion] = React.useState(null)

    const [questionPromise, setQuestionPromise] = React.useState(null)
    const [questionError, setQuestionError] = React.useState(null)

    React.useEffect(function () {
            setQuestion(null)
            setQuestionError(null)
            if (questionPromise) {
                const p = questionPromise
                questionPromise.then(dt => {
                    if (questionPromise === p) {
                        setQuestion(dt)

                        console.log(dt)

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

    console.log(model)

    if (model.isHost) {

        React.useEffect(function () { setQuestionPromise( getQuestion(model.roomCode) ) }, [])

        if (question) {
            console.log(question)
            return <HostInputQuestion question={question}/>
        } else {
            return <Loading/>
        }
    } else {
        return (
            <div>
                <p>Player!</p>
            </div>
        )
    }
}
