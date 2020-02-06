import express from "express"
import discordApi from "./api/discord"
import jailbreak from "./routers/jailbreak"
import fetch from "node-fetch"
// import MySQLDB from "./db/mysql"
import MongoDB from "./db/mongo"
var cookieParser = require("cookie-parser")
var cookieSession = require("cookie-session")

// const db = MySQLDB.constructDefault()
const mongoDB = MongoDB()

const app = express()
app.use(function (req, res, next) {
	// CORS
	res.header("Access-Control-Allow-Origin", process.env.REACT_APP_FRONTEND_URL)
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	)
	next()
})
app.use(
	cookieSession({
		name: "session",
		secret: process.env.SESSION_SECRET,
		// Cookie Options
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	})
)
const root = require("path").join(__dirname, "..", "client", "build")
app.use(express.static(root))
app.use(cookieParser())

app.use("/api/discord", discordApi)
app.use(jailbreak)

app.get("*", (req, res) => {
	res.status(200).sendFile("index.html", { root })
})

const port = process.env.EXPRESS_PORT
app.listen(port, () => {
	console.info("Running on port " + port)
})
