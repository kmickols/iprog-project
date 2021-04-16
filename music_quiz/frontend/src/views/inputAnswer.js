import React from "react";


export default function InputAnswer({question, next}){
    const numQuestions = question.body.length

    return(
        <div>
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
                <button className="button submit-button" onClick={() => next()}> Next Question </button>
            </span>
        </div>
    )
}