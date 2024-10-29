package com.example.htyRouting

import com.example.htyRouting.blogRouting.Route_htyBlog
import com.example.htyRouting.homeRouting.Route_htyHome
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.plugins.cachingheaders.*

import io.ktor.server.routing.*


fun Application.Routing_htySet() {
    routing {
        Route_htyHome()
        Route_htyBlog()
//        staticResources("/", "/")
    }
}