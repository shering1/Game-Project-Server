package com.example

//if sentence and image cards are the same, you can create the same clss, otherwise you can create an abstract parent class

//this is the class we will use to serialize and deserialize our json
data class SentenceCard(val description: String) {
    val id: Int = description.hashCode() //this is our makeshift UUID

    companion object {
        const val path = "/sentenceCards"
    }
}

/*
Our Model will be characterized by...
- a description
- an identifier
 */


