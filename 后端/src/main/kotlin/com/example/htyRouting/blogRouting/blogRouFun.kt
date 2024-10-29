import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.ResultRow
import java.io.File
import java.time.format.DateTimeFormatter

fun hty_seeMD(path: String): List<FileInfo> {
    var howPaper = getMarkdownFilesInFolder(path)
    var splitFileName = splitFileNames(howPaper)
    return splitFileName
}

@Serializable
data class FileInfo(val id: Int, val href: String, val time: String, val title: String)

@Serializable
data class TitleInfo(val id: Int, val href: String, val time: String, val title: String, var like: Int)

@Serializable
data class PaperInfo(
    val id: Int,
    val href: String,
    val time: String,
    val title: String,
    var like: Int,
    var content: String
)


fun ResultRow.toTitleInfo(): TitleInfo {
    return TitleInfo(
        id = this[titleTable.id],
        href = this[titleTable.href],
        time = this[titleTable.time].format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
        title = this[titleTable.title],
        like = this[titleTable.like],
    )
}

fun ResultRow.toPaperInfo(): PaperInfo {
    return PaperInfo(
        id = this[titleTable.id],
        href = this[titleTable.href],
        time = this[titleTable.time].format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
        title = this[titleTable.title],
        like = this[titleTable.like],
        content = this[titleTable.content].toString(),
    )
}


//@Serializable
//data class HowPaperInfo(val id: Int, val href: String, val time: String, val title: String)

fun splitFileNames(fileNames: List<String>): List<FileInfo> {
    val targetFormat = Regex("""^([^–]+)-([^–]+)-(\d{4}-\d{2}-\d{2})-(.+\.md)$""")
    val matchingFiles = mutableListOf<FileInfo>()

    for (fileName in fileNames) {
        if (targetFormat.matches(fileName)) {
            val matchResult = targetFormat.find(fileName)
            if (matchResult != null) {
                val (idStr, href, time, title) = matchResult.destructured
                val id = idStr.toInt() // Convert id from string to int
                val fileInfo = FileInfo(id, href, time, title)
                matchingFiles.add(fileInfo)
            }
        }
    }

    return matchingFiles
}

fun getMarkdownFilesInFolder(folderPath: String): List<String> {
    val folder = File(folderPath)
    val markdownFiles = mutableListOf<String>()

    if (folder.exists() && folder.isDirectory) {
        folder.listFiles { file ->
            file.isFile && file.name.matches(Regex("""\d+-[^-]+-\d{4}-\d{2}-\d{2}-\S+\.md$"""))
        }?.forEach { markdownFile ->
            markdownFiles.add(markdownFile.name)
        }
    }

    println("查询到的md文件为：$markdownFiles")
    return markdownFiles
}

fun convertMarkdownPaths(markdownContent: String, basePath: String): String {
    val imagePattern = "!\\[.*?\\]\\((.*?)\\)".toRegex()
    val linkPattern = "\\[(.*?)\\]\\((.*?)\\)".toRegex()

    val convertedContent = markdownContent.replace(imagePattern) { matchResult ->
        val resourcePath = matchResult.groupValues[1]
        if (resourcePath.startsWith("http")) {
            matchResult.value  // Skip conversion for HTTP resources
        } else {
            val absolutePath = "$basePath/$resourcePath"
            "![]($absolutePath)"
        }
    }.replace(linkPattern) { matchResult ->
        val linkText = matchResult.groupValues[1]
        val resourcePath = matchResult.groupValues[2]
        if (resourcePath.startsWith("http")) {
            matchResult.value  // Skip conversion for HTTP resources
        } else {
            val absolutePath = "$basePath/$resourcePath"
            "[$linkText]($absolutePath)"
        }
    }

    return convertedContent
}
