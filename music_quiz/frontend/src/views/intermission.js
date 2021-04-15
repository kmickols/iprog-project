import React from "react";

export default function Intermission({score, player}) {
    return(
        <div>
            Jao bre swag
            <span className="score"> Your Score: {score}
             </span>
            <span className="player"> Your Name: {player}
             </span>
        </div>
    );

}