package com.example

//This is where we will store our data b/c we don't have a database

var sentenceCards = mutableListOf(
    SentenceCard("sentenceCard1"),
    SentenceCard("sentenceCard2"),
    SentenceCard("sentenceCard3"),
    SentenceCard("sentenceCard4"),
    SentenceCard("sentenceCard5"),
)

//can create an empty array of players and add to this array everytime someone joins a game
var arrayOfPlayers = mutableListOf<Player>()

//create a map of games {gameCode: {GameObj}
var games = HashMap<String, Game>()

//var imageCards = mutableListOf<String>(
//    "image1",
//    "image2",
//    "image3",
//    "image4",
//    "image5",
//    "image6",
//    "image7",
//    "image8",
//    "image9",
//    "image10",
//)