package com.example

data class Game(var players: MutableList<Player>){
    var imageCards = mutableListOf<Card>()
    var sentenceCards = mutableListOf<Card>()
    var status = false
    var code = ""
    var imageCard = Card("imageCard")
    var host = 0
    var selectedCards = mutableListOf<Pair<Card, Int>>() //{cardObj, playerId}
    //var mapOfPlayers: HashMap<String, Player> //{name: PlayerObj}
    var mapOfPlayers = players.associateBy{it.name} //takes listOfPlayers and makes it a map(it is a single object within the list) {name: PlayerObj}
    var winnerOfRound = mutableListOf<String>() //["name", "sentence"]
    var winningPlayer = ""
    var hostSelecting = false
    //when is game over?? -> game needs to know
    fun checkIfWinner(): Boolean{
        for(player in players){
            if(player.score == 2){
                winningPlayer = player.name
                return true
            }
        }
        return false
    }
//    fun play(){
//        //while one player hasn't hit 5 points, keep running rounds, initialize a brand new round each time
//        while(!checkIfWinner()){ //top player doesn't have 5 points
//            //select an image card for the round -> you can pass this to round, but this way is better
//            println("ROUND")
//            val selectedImageCard = imageCards.removeLast()
//            //initialize a round
//            val round = Round(selectedImageCard, sentenceCards, players)
//            //round.setAllHostToFalse()
//            round.findHost()
//            round.dealOutCardsToPlayers()
//            val submittedCards = round.playersSubmitACard() //[(PlayerObj, "sentence")]
//            val winnerOfRound = round.hostPicksWinner(submittedCards) //(PlayerObj, "sentence")
//            println("The winning card is ${winnerOfRound.second} from ${winnerOfRound.first.name}")
//            //update the winning players score
//            mapOfPlayers[winnerOfRound.first.name]!!.score++ //ASK ABOUT NULL //associateby creates a nullable map
//            println(players)
//            round.resetHost()
//
//        }
//        println("You have finished the game! ${winningPlayer} is the winner!")
        //can then return whoever won the game
//    }

}

data class Request(var cardId: Int, var playersId: Int, var cardObj: Card)

data class WinnerOfRound(var cardSentence: String, var playersId: Int)