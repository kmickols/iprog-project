import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

export default function HomePage(props){
    return (
        <Router>
            <switch>
                <Route exact path='/'><p> This is the homepage! :)</p> </Route>
            </switch>
        </Router>
    );
}
