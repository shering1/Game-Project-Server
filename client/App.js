import React from 'react'
import EnterName from "./EnterName";
import DisplayPlayers from "./DisplayPlayers";
import {BrowserRouter as Router, Route} from "react-router-dom";
import EnterName2 from "./EnterName2";
import Welcome from "./Welcome";


class App extends React.Component{
    render() {
        return(
            <div>
                <Router>
                    <Route exact path="/" component={EnterName2}/>
                    <Route path="/welcome" component={Welcome}/>
                    <Route path="/displayPlayers" component={DisplayPlayers}/>
                </Router>
            </div>
        )
    }
}

export default App