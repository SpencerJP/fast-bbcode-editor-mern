import express from "express"
import discordApi from "./api/discord"
import fetch from "node-fetch"
// import MySQLDB from "./db/mysql"
import MongoDB from "./db/mongo"
var cookieParser = require("cookie-parser")
var jsonBodyParser = require("body-parser").json()
var cookieSession = require("cookie-session")

// const db = MySQLDB.constructDefault()
const mongoDB = MongoDB()

const app = express()
app.use(function(req, res, next) {
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

app.get("/rules", async (req, res) => {
	try {
		let string = await mongoDB.getSiteMOTD()
		res.status(200).send(string)
	} catch (err) {
		res.status(400).send(err)
	}
})

app.use("/api/discord", discordApi)

app.get("/index", (req, res) => {
	res.status(200).sendFile("index.html", { root })
})

app.get("/setup", async (req, res) => {
	try {
		// await mongoDB.setupTables()
		let rows = await mongoDB.setupTables()
		res.status(200).send(rows)
	} catch (err) {
		res.status(400).send(err)
	}
})

app.get("/authedusers", async function(req, res) {
	try {
		let result = await mongoDB.getAuthedUsers()
		res.status(200).send(result)
	} catch (err) {
		res.status(400).send(err)
	}
})

app.post("/edit", jsonBodyParser, async function(req, res, next) {
	try {
		let discord_token = req.cookies.discord_token
		let updatedText = req.body.data
		let discordAuthResponse = await fetch(
			"https://discordapp.com/api/users/@me",
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${discord_token}`,
				},
			}
		)
		const currentUser = await discordAuthResponse.json()
		if (currentUser.id) {
			if (await mongoDB.userIsSiteAdmin(currentUser.id)) {
				await mongoDB.updateMotd(updatedText)
			} else {
				throw new Error("User doesn't have permission.")
			}
		} else {
			throw new Error("Discord failed to authorize this user.")
		}
	} catch (err) {
		console.log(err.message)
		res.status(400).send({ error: "Error", errorBody: JSON.stringify(err) })
	}
	next()
})

app.get("*", (req, res) => {
	res.status(200).sendFile("index.html", { root })
})

app.listen(3005, () => {
	console.info("Running on port 3005")
})
