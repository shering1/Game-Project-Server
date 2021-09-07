import React from 'react'
import EnterName from "./EnterName";
import {Redirect} from "react-router-dom";


class DisplayPlayers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            players: null,
            game: null,
            status: null
        }
        this.handleClick = this.handleClick.bind(this)
    }


    //keep getting the updated game state
    async componentDidMount() {
        try{
            this.interval = setInterval(async() => {
                const response = await fetch(`/api/getGame/${this.props.location.state.code}`)
                const currentGame = await response.json()

                this.setState({
                    players: currentGame.players,
                    game: currentGame,
                    status: currentGame.status
                })
            },3000)
        }catch(e){
            console.log(e)
        }
    }
    componentWillUnmount() {
        console.log("unmount has been hit")
        clearInterval(this.interval)
        console.log(`in unmount ${this.interval}`)
    }
    handleClick(){
        console.log("CLICKED")
        fetch(`/api/startingGame/${this.props.location.state.code}`)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(`starting game returned data ${data}`)
            })

    }

    render() {
        if(this.state.status){
            return <Redirect to={{pathname: '/game', state: {playersId: this.props.location.state.playersId, code: this.props.location.state.code, game: this.state.game}}}/>
        }
        if(!this.state.players){
            return(
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
        return(
            <div>
                <h1>Welcome Players!!</h1>
                <h2>Game Code: {this.props.location.state.code}</h2>
                {this.state.players.map((player)=>{
                    return <li>{player.name}</li>
                })}
                {this.state.players[0].id === this.props.location.state.playersId ?
                <button onClick={this.handleClick}>Start Game</button> : <h3>Waiting for host to start game...</h3>}


                {/*{this.props.location.state.players.map((player)=> { //the way we're accessing this state is specific to how we pass it in the redirect*/}
                {/*    return <li>{player.name}</li>*/}
                {/*})}*/}
                {/*{playerToStartGame === playersId ? <button onClick={()=>this.handleClick()}>Start the Game</button> : <h2>Waiting for the host to start the game...</h2>}*/}

            </div>
        )
    }
}

export default DisplayPlayers