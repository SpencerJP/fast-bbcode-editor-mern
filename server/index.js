import express from "express"
import discordApi from "./api/discord"
import DB from './db/connect'
var fs = require("fs")
var cookieParser = require("cookie-parser")

var cookieSession = require("cookie-session")

var db = new DB(process.env.MYSQL_HOST, process.env.MYSQL_HOST, process.env.MYSQL_PASSWORD, process.env.MYSQL_DB)

const app = express()
app.use(
	cookieSession({
		name: "session",
		secret: "testSecret",
		// Cookie Options
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	})
)
const root = require("path").join(__dirname, "client", "build")
app.use(express.static(root))
app.use(cookieParser())

app.get("/rules", async (req, res) => {
	fs.readFile("./plaintextdata_placeholder/defaultmotd.bbcode", "utf8", function (err, data) {
		if (err) {
			res.status(400)
		} else {
			res.send(data)
		}
	})
})

app.use("/api/discord", discordApi)

app.get("/index", (req, res) => {
	if (req.cookies) {
		console.log(req.cookies)
	}
	res.status(200).sendFile("index.html", { root })
})

app.get("/testconn", (req, res) => {
	try {
		db.testConnection()
		res.status(200).send("Success")
	}
	catch (err) {
		res.status(400).send(err)
	}
})

app.listen(3005, () => {
	console.info("Running on port 3005")
})
