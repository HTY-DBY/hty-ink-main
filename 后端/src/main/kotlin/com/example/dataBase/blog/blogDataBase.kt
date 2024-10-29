import com.example.*
import kotlinx.coroutines.Dispatchers
import org.jetbrains.exposed.sql.ColumnType
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

const val JDBC_DRIVER = "com.mysql.cj.jdbc.Driver"
const val DB_URL = "jdbc:mysql://localhost:3306"
const val DB_USER = "root"
const val DB_PASSWORD = "460805asdA"
const val DB_NAME = "htyblog"
const val TABLE_NAME = "paperBlog"

object blogObject {
    fun init() {
        var database_htyBlog = Database.connect(DB_URL, driver = JDBC_DRIVER, user = DB_USER, password = DB_PASSWORD)
        transaction(database_htyBlog) {
            exec("CREATE DATABASE IF NOT EXISTS $DB_NAME")
        }
        val needDatabase = "$DB_URL/$DB_NAME"
        database_htyBlog = Database.connect(needDatabase, driver = JDBC_DRIVER, user = DB_USER, password = DB_PASSWORD)
        transaction(database_htyBlog) {
            SchemaUtils.create(titleTable)
        }
    }

    suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }
}

object titleTable : Table(TABLE_NAME) {
    val id = integer("id")
    override val primaryKey = PrimaryKey(id)
    val title = varchar("title", 1024)
    val time = datetime("time")
    val href = varchar("href", 1024)
    val like = integer("like")
    val content = varchar("content", 1024)
    val isActive = bool("is_active")
}




