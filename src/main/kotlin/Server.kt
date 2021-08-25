

//To run a Ktor server application, you need to create and configure a server first.
//the following servers are supported -> Netty, Jetty, Tomcat and CIO
package com.example

import io.ktor.application.*
import io.ktor.features.*
import io.ktor.jackson.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.tomcat.*




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
        get("/"){
          call.respond("Hello World!")
        }

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