import React from "react";
import { Route, Switch } from "react-router-dom";
import About from "./about";
import Login from "./register-login";

const Home = () => {
    return (
        <div>
            <span>Hello</span>
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/about" component={About} exact />
                <Route path="/login" component={Login} exact />
            </Switch>
        </div>
    );
}

export default App;
