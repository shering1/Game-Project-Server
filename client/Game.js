import React from 'react'
import ReactDOM from 'react-dom'

class Game extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            game: this.props.location.state.game,
            activeCardId: null,
            activeCardObj: null,
            // hostSelecting: false,
            activeSelectedCard: null,
            winningSentenceCard: null,
            winningPlayerId: null

        }
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelectCardClick = this.handleSelectCardClick.bind(this)
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

    //changing the active state of the sentence cards
    handleClick(cardId, card){
        console.log(`click -> ${cardId}`)
        if(this.state.active){
            this.setState({active: null})
        }else{
            this.setState({activeCardId: cardId, activeCardObj: card})
        }
    }

    //changing the active state of the selected cards
    handleSelectCardClick(cardId, cardSentence, playerId){
        //make a post request that puts the curent winner name and sentence on the game and also updates the winners score
        if(this.state.activeSelectedCard !== null){
            this.setState({activeSelectedCard: null})
        }else{
            this.setState({activeSelectedCard: cardId, winningSentenceCard: cardSentence, winningPlayerId: playerId})
        }
    }

    //making an api post call to add the winning player of the round
    handleWinnerSubmit(){
        const payload = {cardSentence: this.state.winningSentenceCard, playersId: this.state.winningPlayerId}
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        }
        fetch(`/api/winnerOfRound/${this.state.game.code}`, options)
            .then(function(response){
                console.log(`this is the response from /winnerOfRound ${response.json}`)
                return response.json()
            })
            .then(function(data){
                console.log(`this is data from /winnerOfRound ${data}`)
            })

    }

    //api post call the add the selected cards to the game
    handleSubmit(){
        // this.setState({hostSelecting: true})
        const payload = {cardId: this.state.activeCardId, playersId: this.props.location.state.playersId, cardObj: this.state.activeCardObj}
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        }
        fetch(`/api/selectedCards/${this.props.location.state.code}`, options)
            .then(function(response){
                console.log(`this is the response from /selectedCards ${response.json}`)
                return response.json()
            })
            .then(function(data){
                console.log(`this is data from /selectedCards ${data}`)
            })
    }

    //api call update information for a new round
    nextRoundClick(){
        fetch(`/api/newRound/${this.state.game.code}`)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(`/newRound returned data ${data}`)
            })

    }
    render() {
        console.log(`playerId in Game -> ${this.props.location.state.playersId}`)
        console.log(`code in Game -> ${this.props.location.state.code}`)
        console.log(`game state in Game -> ${this.props.location.state.game}`)
        console.log(`DO WE HAVE A WINNER -> ${this.state.game.winningPlayer}`)
        let playersSentenceCards = null
        if(this.state.game.winningPlayer.length > 0){
            return(
                <div>
                    <h1>{this.state.game.winningPlayer} is the WINNER!</h1>
                </div>
            )

        }else if(this.state.game.winnerOfRound.length > 0){
            return(
                <div>
                    <h1>You are ready to play a game!</h1>
                    <img src={this.state.game.imageCard.description}></img>
                    <div className="winningCardForRound">
                        <div>Winning Player: {this.state.game.winnerOfRound[0]}    </div>
                        <div>Winning Sentence: {this.state.game.winnerOfRound[1]}</div>
                    </div>
                    {this.props.location.state.playersId === this.state.game.host ? <button onClick={()=>this.nextRoundClick()}>Next Round</button> : <h3>Waiting for host to start next round...</h3>}
                </div>
            )

        }else {
            return (
                <div>
                    <h1>You are ready to play a game!</h1>
                    <img src={this.state.game.imageCard.description}></img>
                    {/*SELECTED CARDS*/}
                    {this.state.game.selectedCards.length === 0 && this.state.game.host === this.props.location.state.playersId ?
                        <div><h3>Waiting for players to submit a card...</h3></div> : null}
                    {this.state.game.selectedCards.map((pair) =>
                        <div className="selectedCards">
                            <div className={this.state.activeSelectedCard === pair.first.id ? "activeCard" : null}
                                 onClick={() => this.handleSelectCardClick(pair.first.id, pair.first.description, pair.second)}>{pair.first.description}</div>
                        </div>
                    )}
                    {this.state.game.selectedCards.length > 0 && this.state.game.host === this.props.location.state.playersId ?
                        <button onClick={() => this.handleWinnerSubmit()}>Submit Winner</button> : null}


                    {/*SENTENCE CARDS*/}
                    {this.props.location.state.playersId !== this.state.game.host ?
                        <div>
                            {this.state.game.players.map((player) => {
                                if (player.id === this.props.location.state.playersId) {
                                    playersSentenceCards = player.playersCards
                                    //i dont know why the below wouldn't work
                                    // player.playersCards.map((card)=> {
                                    //     console.log(`this is CARD -> ${card.description}`)
                                    //     return card.description
                                    // })
                                }
                            })}
                            {playersSentenceCards.map((card) =>
                                <div className="sentenceCards">
                                    <div
                                        className={this.state.activeCardId === card.id && !this.state.game.hostSelecting ? "activeCard" : null}
                                        id={card.id} title={card.description}
                                        onClick={() => this.handleClick(card.id, card)}>{card.description}</div>
                                </div>
                            )}
                            {!this.state.game.hostSelecting ?
                                <button onClick={() => this.handleSubmit()}>Submit Card</button> :
                                <h3>Waiting for the host to select a winner...</h3>}
                        </div>
                        : null}
                </div>
            )
        }
    }
}

export default Game