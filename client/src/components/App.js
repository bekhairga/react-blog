import React from "react";
import { Route, Switch } from "react-router-dom";
import About from "./about";

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
            </Switch>
        </div>
    );
}

export default App;
