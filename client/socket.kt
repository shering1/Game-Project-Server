package client

//import io.ktor.websocket.*
//import io.ktor.client.*
//import io.ktor.client.engine.cio.*
//import io.ktor.client.features.websocket.*
//import io.ktor.http.*
//import io.ktor.http.cio.websocket.*
//import kotlinx.coroutines.*
//import java.util.*
//
//fun main(){
//    val client = HttpClient(CIO){
//        install(WebSockets)
//    }
//    runBlocking{ //starting a WebSocketSession
//        client.webSocket(method = HttpMethod.Get, host = "127.0.0.1", port = 8080, path = "/"){
//            println("Hello socket from the client side")
//        }
//    }
//    client.close()
//}