import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*

suspend fun main() {
    HTTP_HTY()

}

suspend fun HTTP_HTY() {
    val client = HttpClient()

    try {
        val response: HttpResponse = client.get("https://example.com")
        println("Response: $response")
    } catch (e: Exception) {
        println("An error occurred: ${e.message}")
    } finally {
        client.close()
    }
}