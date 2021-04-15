import StartView from "../views/startView";
import React from "react";

export default function StartViewPresenter(props){

    return <StartView hostGame={() => window.location="/create"} joinGame={() => window.location="/join"} tutorial={() => window.location="/tutorial"}/>
}