import React from "react";

export default function HostInputQuestion({question, answer}) {
    console.log(question)

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
                                     <div id ={i + ""} className={"main-table-entry"}>
                                         <tr><td>
                                             {field.text}:
                                         </td>
                                         </tr>
                                         <tr>
                                             <td>
                                                 <input placeholder="Type answer text here" className="fill-form"/>
                                             </td>
                                         </tr>
                                     </div>)})}

       </table>
    </span>
            <span className="main-text">
          <button className="button submit-button" onClick={() => {
              
          }}> Done </button>
      </span>
        </div>
    )

}