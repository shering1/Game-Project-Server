import React from 'react'
import EnterName from "./EnterName";


class DisplayPlayers extends React.Component{
    constructor(props) {
        super(props);
    }
    handleClick(){
        console.log("CLICKED!")

    }
    render() {
        const players = this.props.location.state.players //this is the array of players - created variable for brevity sake
        const playersId = this.props.location.state.playersId //this is the playersId
        const playerToStartGame = players[0].id
        return(
            <div>
                <h1>Welcome Players!</h1>
                {this.props.location.state.players.map((player)=> { //the way we're accessing this state is specific to how we pass it in the redirect
                    return <li>{player.name}</li>
                })}
                {playerToStartGame === playersId ? <button onClick={()=>this.handleClick()}>Start the Game</button> : <h2>Waiting for the host to start the game...</h2>}

            </div>
        )
    }
}

export default DisplayPlayers