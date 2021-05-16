import React from "react";
import Error from "../views/error";

export default function ErrorPresenter(props) {

    return <Error error={ {user_message: props.model.errMsg?props.model.errMsg:"Something went wrong :("} }/>

}