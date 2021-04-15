import React from "react";

export default function ClientInputQuestion({question, score, player, answer, answers, questionAnswered, next}) {
    const numQuestions = question.body.length
    let i = -1

    return(
        <div>
            <span className="main-text">
                {question.text}
                <table className={"main-table"} align={"center"}>
                     {question.body.map(
                         field => {
                             i += 1
                             return(
                                 <div className={"main-table-entry"}>
                                     <tr><td>
                                         {field.text}:
                                     </td>
                                     </tr>
                                     <tr>
                                         <td>
                                             {!questionAnswered?
                                                 <input id ={i + ""} placeholder="Type answer text here" className="fill-form"/>
                                             :
                                                 <input disabled={true} id ={i + ""} placeholder="Type answer text here" className="fill-form" value={answers.length > i?answers[i]:""}/>
                                             }
                                         </td>
                                     </tr>
                                 </div>)})}

                </table>
            </span>
            <span className="main-text">
                {!questionAnswered ?
                    <button className="button submit-button" onClick={() => {
                        let arr = []
                        for (i = 0; i < numQuestions; i++) {
                            arr.push(document.getElementById("" + i).value)
                        }
                        answer(arr)
                    }}> Done </button>
                    :
                    <button className="button submit-button" onClick={() => next()}> Next Question </button>
                }
            </span>
            <span className="score"> Your Score: {score}</span>
            <span className="player"> Your Name: {player}</span>
        </div>
    )

}