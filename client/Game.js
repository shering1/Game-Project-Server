import React from 'react'
import ReactDOM from 'react-dom'

class Game extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.location.state.game
        }
    }
    //keep getting the updated game object
    async componentDidMount() {
        try{
            this.interval = setInterval(async() => {
                const response = await fetch(`/api/getGame/${this.props.location.state.code}`)
                const currentGame = await response.json()

                this.setState({
                    game: currentGame,
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
    handleClick(cardId){
        console.log("CLICK")

    }
    render() {
        console.log(`playerId in Game -> ${this.props.location.state.playersId}`)
        console.log(`code in Game -> ${this.props.location.state.code}`)
        console.log(`game state in Game -> ${this.props.location.state.game}`)
        let playersSentenceCards = null
        return(
            <div>
                <h1>You are ready to play a game!</h1>
                <h2>{this.state.game.imageCard}</h2>

                {this.props.location.state.playersId !== this.state.game.host ?
                <div>
                    {this.state.game.players.map((player)=> {
                        if(player.id === this.props.location.state.playersId){
                            playersSentenceCards = player.playersCards
                            //i dont know why the below wouldn't work
                            // player.playersCards.map((card)=> {
                            //     console.log(`this is CARD -> ${card.description}`)
                            //     return card.description
                            // })
                        }
                    })}
                    {playersSentenceCards.map((card)=> {
                        return <div className="sentenceCards" id={card.id} title={card.description} onClick={()=>this.handleClick(card.id)} >{card.description}</div>
                    })}
                </div>
                :
                    <div><h1>Waiting for players to select cards</h1></div>
                }
            </div>
        )
    }
}

export default Game