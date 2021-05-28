import React from "react";

export default function CreateRoom({loggedInToSpotify, numQuestions, changeNumQuestions, loadingLogin, loadingSpotify, loginSpotify, createRoom, returnToMain, changeQuizType, quizTypes, checked, showLoading}) {
    let i = 0
    let oneQuestion;
    if (numQuestions === 1) {
        oneQuestion = true;
    }
    return (

        <div className="main-text">
            <div>
                {!loggedInToSpotify?
                    <span className={"main-text"}>
                        <button className="button smaller-button" disabled={loadingSpotify || loadingLogin} onClick={() => loginSpotify()}>Login with Spotify </button>
                        {loadingSpotify?<div className="main-text">Authenticating...</div>:<div/>}
                        {loadingLogin?<div className="main-text">loading...</div>:<div/>}
                    </span>
                    :
                    (<div className="authenticated"><span className={"main-text"}>Spotify Authenticated!</span> <span className={"main-text"}>Please do not use Spotify for anything else during the quiz.</span></div>)}
            </div>
            <div className="main-text">
                <span className="main-text createRoom">
                Choose Genre
                </span>
                    <span className="createRoom">
                        <div className="radio-genre">
                            {
                                quizTypes.map(type => {
                                i += 1

                                return (
                                    <span>
                                        <input type="radio" id={"radio"+type} name="radioGenre" value={type} checked={type === checked} onClick={() => changeQuizType(type)}/>
                                            <label htmlFor={"radio"+type}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
                                        {i%4===0?<div><br/></div>:null}
                                    </span>
                                )
                            })
                            }
                    </div>
                </span>
            </div>
            <br/>

            <div align={"center"}>
                    <span className="main-text createRoom dist">
                        Number of questions </span>
                        <button className="button num-button"
                                disabled={numQuestions === 20}
                                onClick={() => changeNumQuestions(numQuestions + 1)}>+</button>
                {!oneQuestion?<span className="main-text createRoom">{numQuestions} Questions
                        </span>: <span className={"main-text createRoom"}>{numQuestions} Question</span>}

                <button className="button num-button"
                        disabled={numQuestions === 1}
                        onClick={() => changeNumQuestions(numQuestions - 1)}>-</button>
            </div>
            <div>
                <span className={"main-text"}>
                <button className="button smaller-button" disabled={showLoading||!loggedInToSpotify} onClick={() => createRoom()}>Create Room</button>
                </span>
                <span className="main-text">
                    {!loggedInToSpotify?<div className="small-error-text">
                        <div>Please login to Spotify</div>
                    </div>
                    : <div/>}
                    {showLoading?<div className="main-text">Loading...</div>
                    :<div/>}
                </span>
            </div>
            <span className={"main-text"}>
                <button className="button mini-button" onClick={() => returnToMain()}>  &#5130; Back </button>
            </span>
        </div>
    );
}
