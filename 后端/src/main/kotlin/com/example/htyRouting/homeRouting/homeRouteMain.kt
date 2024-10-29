package com.example.htyRouting.homeRouting

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.io.File

const val STATIC_NAME = "static"

fun Route.Route_htyHome() {
    route("/") {
        get("") {
            call.respond(HttpStatusCode.OK, "hty.ink-服务器的后端连接成功")
        }
    }
    route("/$STATIC_NAME") {
        get("") {
            call.respond(HttpStatusCode.OK, "hty.ink-服务器的公开资源库连接成功")
        }
        get("/") {
            call.respond(HttpStatusCode.OK, "hty.ink-服务器的公开资源库连接成功")
        }
        get("{folderName...}") {
            val folderName = call.parameters.getAll("folderName")?.joinToString(File.separator)
            if (folderName != null) {
                val customResourcePath = STATIC_NAME
                val folderPath = File(customResourcePath, folderName)
                if (folderPath.exists()) {
                    if (folderPath.isFile) {
                        call.respondFile(folderPath)
                    } else if (folderPath.isDirectory) {
                        val fileList = folderPath.walkTopDown()
                            .filter { it.isFile }
                            .toList()
                        call.respond(fileList)
                    } else {
                        call.respond(HttpStatusCode.NotFound, "路径名为 $folderPath 的文件或目录不存在")
                    }
                } else {
                    call.respond(HttpStatusCode.NotFound, "路径名为 $folderPath 的文件或目录不存在")
                }
            } else {
                call.respond(HttpStatusCode.BadRequest, "缺少文件路径")
            }
        }

    }
}