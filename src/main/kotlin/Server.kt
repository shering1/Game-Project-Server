

//To run a Ktor server application, you need to create and configure a server first.
//the following servers are supported -> Netty, Jetty, Tomcat and CIO
package com.example

import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.content.*
import io.ktor.jackson.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.tomcat.*
import java.io.File


//generating game code
fun getRandomString(length: Int) : String {
    val allowedChars = ('A'..'Z') + ('a'..'z') + ('0'..'9')
    return (1..length)
        .map { allowedChars.random() }
        .joinToString("")
}

//starts the server
fun main() {
    embeddedServer(Tomcat, port = 8080) { //create the server
        module()
    }.start(wait = true) //start the server
}

//configures the server
fun Application.module(){
    //Tell the server to use jackson serialization and deserialization for request
    install(ContentNegotiation){
        jackson()
    }

    routing {
        //Static Assets
        static(""){ //creating a static route to serve static content, path is "/"
            staticRootFolder = File("/Users/shering/EverQuote/Kotlin/SettingUpAServer/public")
            files(".") //define the folder where we want the content to be served from -> "." means that all files within this folder are severable
            default("index.html") //we can define the default file to be loaded. so a request to /assets would serve index.html
            //take all the files from public, and serve the files(".")which means that all files within public are serverable. if they just server / then server index.html
            //in our index.html we are serving /bundle.js
        }
        //ROUTES FOR PLAYERS
        //getting all players
        get("/api/players"){
            println("The GET request to players has been hit")
            call.respond(arrayOfPlayers)
        }
        //creating new players
        post("/api/players"){
            val newPlayer = call.receive<Player>() //ContentNegotiation is working here to negotiate the media type of request and deserialize the content to an object of a required type
            arrayOfPlayers += newPlayer //add the new player to the arrayOfPlayers
            println("This is the arrayOfPlayers, $arrayOfPlayers")
            call.respond(mutableListOf(newPlayer)) //returns the newPlayer
        }

        //ROUTES FOR GAME
        //getting all active games
        get("/api/games"){
            call.respond(games)
        }
        //get the array of players for a specific game
        get("/api/getPlayers/{code}"){
            val code = call.parameters["code"]
            val currentPlayers = games[code]!!.players
            call.respond(currentPlayers)
        }
        //getting a specifc game ->HAVENT TESTED THIS OUT YET
        get("/api/getGame/{code}"){
            val code = call.parameters["code"]
            val game = games[code]
            call.respond(game!!)
        }
        //creating a new instance of a game
        post("/api/game"){
            println("api/game has been hit")
            val playerCreatedGameInstance = call.receive<Game>()
            println("whats in the game? ${playerCreatedGameInstance.imageCards}")
            val code = getRandomString(4)
            println("this is the code $code")
            games[code] = playerCreatedGameInstance
            println("this is the games map $games")
            call.respond(games)
        }
        //adding a player to a joining game
        post("/api/updatePlayer/{code}"){
            println("You are in the post call for update players")
            val addPlayer = call.receive<Player>()
            val code = call.parameters["code"]
            var findGame = games[code]
            findGame!!.players += addPlayer
            println("the code in the post $code")
            println("this is the new games map $games")
            call.respond(games)
        }



        //Sentence Cards
        route(SentenceCard.path){ //all routes in this block are to /sentenceCards. this will not work w/o contentNegotiation
            get{
                call.respond(sentenceCards) //i'm expecting this to return to me a json object
             }
            post{
                val card = call.receive<SentenceCard>()
                sentenceCards += card
                call.respond(card)
            }
            delete("/{id}"){
                val id = call.parameters["id"]?.toInt() ?: error("Invalid delete request")
                sentenceCards.removeIf {it.id == id}
                call.respond("The id has been deleted")
            }

        }
    }

}



/*Main Function
-in the main function we are instantiating a server with ktor
-we're telling the embedded server that ships with ktor to use the Tomcat engine on a port of our choice
*/

/*Application.module
-Application.module needs to tell the server what content
-initializes different parts of the server
*/

/*Ktor Features - provides extra functionality
-each install adds one feature to our ktor application
-Content Negotiation -> provides the automatic content conversion of requests based on their Content-Type and Accept headers.
-CORS -> configures Cross-Origin Resource Sharing. Will allow us later to make calls from arbitrary JavaScript clients
-Compression -> reduces the amount of data that's needed to be sent to the client by gzipping outgoing content when applicable
*/

/*
We are using frontend-maven-plugin here to build our application. it will first run/install node and npm (so prefix it with the folder
to where your package.json lives) and then it will run your build script(also use the same prefix) to run the build script inorder to build
webpack and the bundle.js. It's important to keep all these files in your client folder(it was breaking otherwise)
* */

/*
the target folder is created upon build and it holds the classes
*/

/*
Static Assets Notes
//once the browser gets the index.html, it going to need to request static assests from the server(css, images, webpack)
//ex in express: app.use('/static', express.static(path.join(__dirname, 'public')))
//our server should send its index.html for any requests that don't match one of our API routes
//ex in express: app.get('*', (req, res)-> {
// res.sendFile(path.join(__dirname, './pathtoindex.html'))})
*/

//other example from workshop... this is not working
//get("/"){
//    call.respondText(
//        this::class.java.classLoader.getResource("index.html")!!.readText(), //getting index.html from the jar file
//        ContentType.Text.Html
//    )
    //someones going to do a /bundle.js and i have to give that to them
    //youcan do anything that is a / do this directiory content
//}