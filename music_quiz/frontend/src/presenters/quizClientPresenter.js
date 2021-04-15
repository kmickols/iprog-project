import React from "react";
import {answerQuestion, getQuestion} from "../components/roomAPI";
import Loading from "../views/loading";
import ClientInputQuestion from "../views/clientInputQuestion";

export default function QuizClientPresenter(props) {
    const model = props.model

    const [question, setQuestion] = React.useState(null)

    const [questionPromise, setQuestionPromise] = React.useState(null)
    const [questionError, setQuestionError] = React.useState(null)
    const [questionAnswered, setQuestionAnswered] = React.useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(-1)
    const [answers, setAnswers] = React.useState([])

    React.useEffect(function () {
            const prevQuestion = question
            setQuestion(null)
            setQuestionError(null)
            if (questionPromise) {
                const p = questionPromise
                questionPromise.then(dt => {
                    if (questionPromise === p) {
                        if(currentQuestionIndex === dt.index){
                            setQuestion(prevQuestion)
                        } else if(dt !== prevQuestion) {
                            setQuestionAnswered(false)
                            setAnswers([])
                            setCurrentQuestionIndex(dt.index)
                            setQuestion(dt)
                        }
                    }
                }).catch(er => {
                        if (questionPromise === p) {
                            setQuestionError(er)
                            console.log(er)
                        }
                    }
                )
            }
        }, [questionPromise]
    )

    React.useEffect(function () { setQuestionPromise( getQuestion(props.match.params.roomCode) )}, [])

    if (question) {
        return <ClientInputQuestion question={question}
                                    questionAnswered={questionAnswered}
                                    answer={(arr) => {
                                        setAnswers(arr)
                                        answerQuestion(props.match.params.roomCode, arr, currentQuestionIndex).then(dt => console.log(dt))
                                        setQuestionAnswered(true)
                                        }
                                    }
                                    answers = {answers}
                                    next={() => setQuestionPromise(getQuestion(props.match.params.roomCode) )}
        />
    } else {
        return <Loading/>
    }
}