import TutorialPage from "../views/tutorialPage";
import React from "react";

export default function TutorialPresenter(props) {
    return <TutorialPage returnToMain={() => window.location = "/"}/>
}