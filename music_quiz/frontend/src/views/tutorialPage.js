import React from "react";

export default function TutorialPage({returnToMain}) {
    return(
        <div align={"center"}>
        <span className="main-text extra-bold-text"> <p> HOW TO PLAY! </p></span>
            <span className="main-text dist">
                <section>
                    <article> </article>
                        <details>
                          <summary className="tutorial-button">Host a game</summary>
                            <ul className="tutorial-text">
                                <li>Choose "Host a quiz" on the home screen</li>
                                <li>Log in with your Spotify Premium account </li>
                                <li>Choose a music genre and number of questions</li>
                                <li>Choose "Create room" to generate a room code</li>
                                <li>Wait for the players to join the room with the provided room code</li>
                                <li>When everyone is ready, start the game!</li>
                            </ul>
                        </details>
                </section>
            </span>
            <span className="main-text dist">
                <section>
                    <article> </article>
                        <details>
                            <summary className="tutorial-button">Join a game</summary>
                            <ul className="tutorial-text">
                                <li>Choose "Join a quiz" on the home screen</li>
                                <li>Enter the room code provided by the host </li>
                                <li>Enter a cool nickname</li>
                                <li>Wait for the game to begin!</li>
                            </ul>
                        </details>
                </section>
            </span>
            <span className="main-text dist">
                <section>
                    <article> </article>
                        <details>
                            <summary className="tutorial-button">How to play</summary>
                            <ul className="tutorial-text">
                                <li> The host will play a song from the chosen genre for 30 seconds </li>
                                <li> Your goal is to identify the song and answer the questions about it</li>
                                <li>Enter your answer and submit it before the time runs out!</li>
                                <li>You gain one point for each correct answer</li>
                                <li>The correct answers will be shown when the time runs out</li>
                                <li>Wait for the host to proceed to next question</li>
                                <li>When all questions have been answered, the scores on the leaderboard will be shown!</li>
                            </ul>
                        </details>
                </section>
            </span>
    </div>

)
}
