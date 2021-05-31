import React from "react";


export default function InputAnswer({question, next, showResults, questionNum, totQuestionNum}){
    const numQuestions = question.body.length

    return(
        <div align={"center"}>
            <span className="main-text">
                Question {questionNum}/{totQuestionNum}
            </span>
            <br/>
            <span className="main-text">
                {numQuestions===1?"Correct Answer:":"Correct Answers:"}
                <table className={"main-table"} align={"center"}>
                     {question.body.map(
                         field => {
                             return(
                                 <div className={"main-table-entry"}>
                                     <tr>
                                         <td>
                                            {field.text}:
                                         </td>
                                     </tr>
                                     <tr>
                                         <td>
                                             {field.answer}
                                         </td>
                                     </tr>
                                 </div>)})}
                </table>
                <button className={"button smaller-button"} onClick={() => next()}> {showResults?"Show Results!":"Next Question"} </button>
            </span>
        </div>
    )
}