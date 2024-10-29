package com.example

import HTTP_HTY
import com.example.htyRouting.Routing_htySet
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import kotlinx.coroutines.runBlocking
import java.net.http.HttpClient


fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}


fun Application.module() {
    Environment_SET_HTY.ENSET()
    pluIns()
    Routing_htySet()
//    blog的数据库启动
    blogObject.init()
}

fun Application.pluIns() {
    install(ContentNegotiation) {
//        JSON 序列化器
        json()
    }
    install(CORS) {
        anyHost()
    }
}

object Environment_SET_HTY {
    val enSET = "PRODUCTION"

    //    val enSET = "DEVELOPMENT"
    var hrefEnvironment = ""

    fun ENSET() {
        when (enSET) {
            "DEVELOPMENT" -> {
                hrefEnvironment = "http://localhost:9000"
            }

            "PRODUCTION" -> {
                hrefEnvironment = "https://api.hty.ink"
            }
        }
    }
}



