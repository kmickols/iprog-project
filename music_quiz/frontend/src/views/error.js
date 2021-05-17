import React from "react";

export default function Error({error}){

    return (
        <div align={"center"}>
            <h1 className={"main-text extra-big-text"}>There was an error! :(</h1>
            <h3 className={"main-text"}>{error.user_message?error.user_message:error.message}</h3>
            <span className="main-text">
                <button className={"button"} onClick={() => window.location = "/"}>Return to Main Menu</button>
            </span>
        </div>
    )
}