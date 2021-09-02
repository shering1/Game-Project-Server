import React from 'react'
import EnterName from "./EnterName";
import DisplayPlayers from "./DisplayPlayers";
import {BrowserRouter as Router, Route} from "react-router-dom";


class App extends React.Component{
    render() {
        return(
            <div>
                <Router>
                    <Route exact path="/" component={EnterName}/>
                    <Route path="/displayPlayers" component={DisplayPlayers}/>
                </Router>
            </div>

        )
    }
}

export default App