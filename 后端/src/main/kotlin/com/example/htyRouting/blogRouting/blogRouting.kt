package com.example.htyRouting.blogRouting

import blogObject.dbQuery
import com.example.Environment_SET_HTY
import convertMarkdownPaths
import hty_seeMD

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.plus
import titleTable.href
import titleTable.id
import toPaperInfo
import toTitleInfo
import java.io.File

import java.time.LocalDateTime

const val Route_NAME = "/blog"
const val STATIC_NAME = "static"
const val BLOG_STATIC_NAME = "$STATIC_NAME/blogPaper"
const val TIME_BACK_INIT = "T00:00:00"
var PORT_URL = Environment_SET_HTY.hrefEnvironment

fun Route.Route_htyBlog() {
    route(Route_NAME) {
        get {
            call.respond(HttpStatusCode.OK, "hty.ink-博客的后端连接成功")
        }
        get("/") {
            call.respond(HttpStatusCode.OK, "hty.ink-博客的后端连接成功")
        }
        get("paper/{data}") {
            var data_paper_cx = call.parameters["data"] ?: ""
//            println(data_paper_cx)
            dbQuery {
                if (titleTable.select { href eq data_paper_cx }.count() > 0) {
                    titleTable.update({ href eq data_paper_cx }) {
                        it[like] = titleTable.like + 1
                    }
                }
            }
            val paper_in = dbQuery {
                titleTable.select { (titleTable.href eq data_paper_cx) and (titleTable.isActive eq true) }.map {
                    it.toPaperInfo()
                }

            }
            call.respond(HttpStatusCode.OK, paper_in)
        }
        get("paper") {
            val title_in = dbQuery {
                titleTable.select { titleTable.isActive eq true }.map {
                    it.toTitleInfo()
                }
            }
            call.respond(HttpStatusCode.OK, title_in)
        }
        get("paper/") {
            val title_in = dbQuery {
                titleTable.selectAll().map {
                    it.toTitleInfo()
                }
            }
            call.respond(HttpStatusCode.OK, title_in)
        }

        get("paperGet/{paper_name}") {
            var paper_name = call.parameters["paper_name"] ?: ""
            var text_in = File("$BLOG_STATIC_NAME/$paper_name").readText()
            val convertedMarkdown = convertMarkdownPaths(text_in, "$PORT_URL/$BLOG_STATIC_NAME")
            call.respond(HttpStatusCode.OK, convertedMarkdown)
        }

        get("push") {
            val howPaper = hty_seeMD(BLOG_STATIC_NAME)

            dbQuery {
                titleTable.update {
                    it[isActive] = false
                }
            }
            for (i in howPaper) {
                val fileContent = "${i.id}-${i.href}-${i.time}-${i.title}"
                val updateTime = LocalDateTime.parse(i.time + TIME_BACK_INIT)
                val likeCount = 0
                val titleTo = i.title.removeSuffix(".md")
                val idTo = i.id
                val hrefTo = i.href
                dbQuery {
                    titleTable.insertIgnore {
                        it[id] = idTo
                        it[title] = titleTo
                        it[time] = updateTime
                        it[like] = likeCount
                        it[content] = fileContent
                        it[href] = hrefTo
                        it[isActive] = true
                    }
                    if (titleTable.select { id eq i.id }.count() > 0) {
                        titleTable.update({ id eq i.id }) {
                            it[title] = titleTo
                            it[time] = updateTime
//                            it[like] = likeCount
                            it[content] = fileContent
                            it[href] = hrefTo
                            it[isActive] = true
                        }
                    }
                }
            }
            call.respond(HttpStatusCode.OK, howPaper)
        }


    }
}



