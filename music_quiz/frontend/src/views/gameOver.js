import React from "react";

export default function GameOver(props){
    return (
        <div>
            <span className={"main-text"}>The results are in!</span>
            <span className={"main-text"}>Thank you for playing</span>
            <br/>
            <span className={"main-text"}>Your Score: {props.score}</span>
            <br/>
            <span className={"main-text"}>
            <button  className={"button"} onClick={()=> props.history.push("/")} >Return To Main Menu</button></span>
        </div>
    )
}