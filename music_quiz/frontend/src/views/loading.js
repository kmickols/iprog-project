import React from "react";

export default function Loading(props){
    return (<div className="center">
            <img src = "http://www.csc.kth.se/~cristi/loading.gif"/>
            <br/>
            <div className="main-text">
                Loading...
            </div>
    </div>)
}