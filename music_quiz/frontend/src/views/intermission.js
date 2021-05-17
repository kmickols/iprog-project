import React from "react";

export default function Intermission({score, player, next, message, answers}) {
    return(
        <div align={"center"}>
            <span className={"main-text"}>
                {message?message:null}
            </span>
            <br/>
            <span className={"main-text"}>
                Your answers:
            </span>
                <table className={"main-table"} align={"center"}>
                         {answers.map(
                             answer => {
                                 return(
                                     <div className={"main-table-entry"}>
                                         <tr>
                                             <span className="main-text">{answer} </span>
                                         </tr>
                                     </div>)})}

                </table>
            <br/>
            <span className={"main-text"}>
                Wait for the next question!
            </span>

            <span className="score"> Score: {score}
             </span>
            <span className="player"> Player: {player}
             </span>


        </div>
    );

}