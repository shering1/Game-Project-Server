import React from 'react'
import {Redirect} from "react-router-dom";


class EnterName2 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            players: null,
            playersId: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        this.setState({value: event.target.value})
    }
    handleSubmit(event){
        event.preventDefault()
        this.setState({value: ""})
        const gettingAccessToThisKeyword = this
        const newPlayer = {name: this.state.value}
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPlayer)
        }
        fetch("/api/players", options)
            .then(function(response){
                console.log(`this is the response, ${response.json}`)
                return response.json()
            })
            .then(function(data){
                console.log(`this is data, ${data}`)
                gettingAccessToThisKeyword.setState({players: data, playersId: data[0].id})
            })

    }

    render() {
        if(this.state.players){
            console.log(`player state -> ${this.state.playersId}`)
            console.log(`player state -> ${this.state.players[0].name}`)
            return <Redirect to={{pathname: '/welcome', state: {players: this.state.players, playersId: this.state.playersId}}}/>
        }
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
    }
}

export default EnterName2