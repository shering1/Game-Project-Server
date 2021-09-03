import React from 'react'
import {Redirect} from "react-router-dom";

//you have access to the individual playersId here as well
class Welcome extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            games: null,
            code: null,
            clicked: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //set interval to constantly get the active games
    async componentDidMount() {
        try{
            this.interval = setInterval(async() => {
                const response = await fetch("/api/games")
                const allGames = await response.json()

                this.setState({
                    games: allGames
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

    handleChange(event){
        this.setState({value: event.target.value})
    }
    handleClick(){ //starting a new game
        const gettingAccessToThisKeyword = this
        const playerToSend = {players: this.props.location.state.players}
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(playerToSend)
        }
        fetch("/api/game", options)
            .then(function(response){
                console.log(`this is the response from /game ${response.json}`)
                return response.json()
            })
            .then(function(data){
                console.log(`this is data from /game ${data}`) //i should be sending back the game instance
                let getCode = null
                //FIND A DIFFERENT WAY TO DO THIS!!
                for(let key in data){
                    getCode = key
                    break
                }
                console.log(`yo did i find the code?? ${getCode}`)
                gettingAccessToThisKeyword.setState({clicked: true, code: getCode})
            })
    }
    handleSubmit(event){ //joining a game
        event.preventDefault()
        const gettingAccessToThisKeyword = this
        const passedInCode = this.state.value
        console.log(`passed in code ${passedInCode}`)
        this.setState({value: "", code: passedInCode})
        if(this.state.games[passedInCode]){
            console.log("true")
            const addPlayer = {name: this.props.location.state.players[0].name}
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addPlayer)
            }
            fetch(`/api/updatePlayer/${passedInCode}`, options)
                .then(function(response){
                    console.log(`this is the response from /updatePlayers ${response.json}`)
                    return response.json()
                })
                .then(function(data){
                    console.log(`this is data from /updatePlayers ${data}`) //i should be sending back the game instance
                    gettingAccessToThisKeyword.setState({clicked: true})
                })
        }else{
            console.log("The code is invalid")
        }

    }

    render() {
        if(this.state.clicked){
            return <Redirect to={{pathname: '/displayPlayers', state: {playersId: this.props.location.state.playersId, code: this.state.code}}}/>
        }

        return(
            <div>
                <h1>Let's Play!</h1>
                <button onClick={()=>this.handleClick()}>Start New Game</button>
                <h2>OR</h2>
                <form onSubmit={this.handleSubmit}>
                    {/*<input type="submit" value="Submit" />*/}
                    <button type="submit">Join Game</button>
                    <label>
                        <input type="text" placeholder="Enter Game Code" value={this.state.value} onChange={this.handleChange} />
                    </label>
                </form>
            </div>
        )
    }
}

export default Welcome