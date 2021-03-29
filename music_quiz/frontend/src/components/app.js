import React from "react";
import {render} from "@testing-library/react";
import HomePage from "./HomePage.js"

function App(props){
   return  (
       <div>
        <HomePage/>
        </div>
    );
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv)