import React from "react";

function ClientMultipleChoice ({score}) {
    return(
        <div>
            <span className={} = "main-text">
                <!--Fråga goes here-->
                <table style="display: grid; justify-content: center">
       <tr>
           <td>
        <button className="button quiz-button"> Alt 1</button></td>
        <td>
        <button className="button quiz-button"> Alt 2</button></td>
      </tr>
      <tr>
        <td>
          <button className="button quiz-button"> Alt 3</button></td>
        <td>
          <button className="button quiz-button"> Alt 4</button></td>
      </tr>
      </table>
      </span>
            <span className="main-text">
          <button className="button submit-button"> Done </button>
      </span>
            <span className="score"> Your Score: {score}
             </span>
        </div>
    );}