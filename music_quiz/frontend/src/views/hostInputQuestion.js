import React from "react";

export default function HostInputQuestion({question}) {
    console.log(question)
    return(
        <div>
            <span className="main-text">

                {question.text}
                <table>
                         {question.body.map(
                             field => {
                                 return(
                                     <div>
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
          <button className="button submit-button"> Done </button>
      </span>
        </div>
    )

}