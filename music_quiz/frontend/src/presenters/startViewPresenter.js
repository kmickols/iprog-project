import StartView from "../views/startView";
import React from "react";

export default function StartViewPresenter(props){

    return <StartView hostGame={() => props.history.push("/create")} joinGame={() => props.history.push("/join")} tutorial={() => props.history.push("/tutorial")}/>
}