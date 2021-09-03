import React from 'react'
import EnterName from "./EnterName";


class DisplayPlayers extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            players: null,
            game: null,
            status: null
        }
    }


    //keep getting the updated players for the game code
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
        //i will need to change the game status to true here

    }

    render() {
        // const players = this.props.location.state.players //this is the array of players - created variable for brevity sake
        // const playersId = this.props.location.state.playersId //this is the playersId
        // const playerToStartGame = players[0].id
        console.log(`display players id -> ${this.props.location.state.playersId}`)
        console.log(`display players code -> ${this.props.location.state.code}`)
        console.log(`the current players -> ${this.state.players}`)
        console.log(`the current game -> ${this.state.game}`)
        console.log(`the current status -> ${this.state.status}`)
        if(this.state.players){
            console.log(`these are the current players length ${this.state.players.length}`)
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