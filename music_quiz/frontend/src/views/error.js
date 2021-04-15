import React from "react";

export default function Error({error}){

    return (
        <div>
            <h1 className={"extra-big-text"}>There was an error! :(</h1>
            <h3 className={"main-text"}>{error.user_message?error.user_message:error.message}</h3>
            <span className="main-text">
                <button className={"smaller-button"} onClick={() => window.location = "/"}>Return to Main Menu</button>
            </span>
        </div>
    )
}