import React from 'react'
import DisplayPlayers from "./DisplayPlayers";
import {Redirect} from "react-router-dom";

//THIS COMPONENT IS NOT BEING USED
class EnterName extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            players: [],
            enteredName: false,
            playersId: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        try{
            this.interval = setInterval(async() => {
                const response = await fetch("/api/players")
                const playersData = await response.json()

                this.setState({
                    players: playersData
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
    // handleSubmit(event){
    //     event.preventDefault()
    //     this.setState({value: "", enteredName: true})
    //     const gettingAccessToThisKeyword = this
    //     const newPlayer = {name: this.state.value}
    //     const options = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newPlayer)
    //     }
    //     fetch("/api/players", options)
    //         .then(function(response){
    //             console.log(`this is the response, ${response.json}`)
    //             return response.json()
    //         })
    //         .then(function(data){
    //             console.log(`this is data, ${data}`)
    //             gettingAccessToThisKeyword.setState({playersId: data.id})
    //         })
    //
    // }
    render() {
        //redirect will not make another call to server, react will just change what you're looking at through looking at the bundle.js
        //i was getting a 404 because it was looking for displayPlayers on the server side which didn't exist, by just typing the route into the url
        if(this.state.players.length === 2){
            console.log("hit the redirect")
            return <Redirect to={{pathname: '/displayPlayers', state: {players: this.state.players, playersId: this.state.playersId}}}/>
        }
        if(!this.state.enteredName){
            return(
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Please Enter Your Name:
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            )
        }else{
            return(
                <div>
                    <h2>Waiting for other players to join</h2>
                </div>
            )

        }

    }
}

export default EnterName