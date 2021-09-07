package com.example

//This is where we will store our data b/c we don't have a database

var sentenceCards = mutableListOf(
    Card("Quarantine got me like..."),
    Card("When it's your birthday and your Facebook wall reminds you that you have friends"),
    Card("When your parents forget to leave you a trust fund"),
    Card("Friday Mood"),
    Card("When soccer season starts"),
    Card("New year, new me"),
    Card("Finally found the perfect background for my zoom meetings"),
    Card("When your code works on the first try"),
    Card("Feeling cute, might delete later"),
    Card("When your friend is roasting you and it lowkey hurts your feelings"),
    Card("When you see someone you know in public"),
    Card("Keep calm and carry on"),
    Card("When your phone is at 1%"),
)

//can create an empty array of players and add to this array everytime someone joins a game
var arrayOfPlayers = mutableListOf<Player>()

//create a map of games {gameCode: {GameObj}
var games = HashMap<String, Game>()

var imageCards = mutableListOf<String>(
    "image1",
    "image2",
    "image3",
    "image4",
    "image5",
    "image6",
    "image7",
    "image8",
    "image9",
    "image10",
)