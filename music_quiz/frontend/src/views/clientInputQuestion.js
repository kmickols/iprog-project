import React from "react";

export default function ClientInputQuestion({question, score, player}) {
    return(
        <div>
            <span className="main-text">
                <!--Question goes here-->
                {question.text}
                <table style="display: grid; justify-content: center">
                    {questions.data.map(
                        function () {
                            return(
                                <div>
                                    <tr><td>
                                        {question.body.text}:
                                    </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input placeholder="Type answer text here" className="fill-form"/>
                                        </td>
                                    </tr>
                                  </div>)})};

       </table>
    </span>
            <span className="main-text">
          <button className="button submit-button"> Done </button>
      </span>
            <span className="score"> Your Score: {score}
             </span>
            <span className="player"> Your Name: {player}
             </span>
        </div>
    )

}