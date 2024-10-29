val ktor_version: String by project
val kotlin_version: String by project
val logback_version: String by project
val exposed_version: String by project

plugins {
    kotlin("jvm") version "1.9.0"
    id("io.ktor.plugin") version "2.3.3"
    kotlin("plugin.serialization") version "1.9.0"

}

group = "com.example"
version = "1.0"

application {
    mainClass.set("com.example.MainApiBeginKt")

    val isDevelopment: Boolean = project.ext.has("development")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=$isDevelopment")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-cors:$ktor_version")
    implementation("io.ktor:ktor-server-content-negotiation:$ktor_version")
    implementation("io.ktor:ktor-serialization-kotlinx-json:$ktor_version")
    implementation("io.ktor:ktor-server-core-jvm")
    implementation("io.ktor:ktor-server-netty-jvm")
    implementation("ch.qos.logback:logback-classic:$logback_version")
    testImplementation("io.ktor:ktor-server-tests-jvm")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
    implementation("io.ktor:ktor-server-caching-headers:$ktor_version")
    implementation("mysql:mysql-connector-java:8.0.28")
    implementation("org.jetbrains.exposed:exposed-core:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-dao:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-java-time:$exposed_version")
    implementation("io.ktor:ktor-client-core")
    implementation("io.ktor:ktor-client-cio")

}

val copyResourcesToJar by tasks.registering(Copy::class) {
    group = "custom"
    description = "Copy non-static resources to the JAR package"

    from("static")
    into("build/libs/static")
//    include("**/*.txt") // 用于指定需要复制的文件类型，可以根据需要修改
}
ktor {
    fatJar {
        archiveFileName.set("hty-back.jar")
    }

}

tasks.named("jar") {
    dependsOn(copyResourcesToJar)
}
tasks.named("buildFatJar") {
    dependsOn(copyResourcesToJar)
}
