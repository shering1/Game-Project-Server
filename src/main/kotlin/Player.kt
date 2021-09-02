package com.example

data class Player(val name: String, var score: Int = 0) { //we don't put players cards here, we wouldn't deal out cards before initializing a player. same with host
    val id: Int = name.hashCode() //this is our makeshift UUID
    var playersCards: List<String> = listOf()
    var isHost: Boolean = false

    fun setPlayerCards(dealtCards: List<String>){//take a list of cards 7 cards to assign to the player
        playersCards = dealtCards
    }
    fun selectCard(): Int{
        var randomIdx = (0 until playersCards.size).random()
        return randomIdx
    }

}