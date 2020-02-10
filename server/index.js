import express from "express"
import discordApi from "./api/discord"
import jailbreak from "./routers/jailbreak"
// import MySQLDB from "./db/mysql"
import MongoDB from "./db/mongo"
var cookieParser = require("cookie-parser")
var cookieSession = require("cookie-session")
const path = require("path")

// const db = MySQLDB.constructDefault()
const mongoDB = MongoDB()
var jsonBodyParser = require("body-parser").json()

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
app.use(cookieParser())

app.use("/api/discord", discordApi)
app.use("/jailbreak", jailbreak)

app.get("/demodata", async (req, res) => {
	try {
		let string = await mongoDB.siteMessageDataModel.getDemo()
		res.status(200).send(string)
	} catch (err) {
		res.status(400).send(err)
	}
})

app.post("/demoedit", jsonBodyParser, async function(req, res, next) {
	try {
		let updatedText = req.body.data
		await mongoDB.siteMessageDataModel.updateDemo(updatedText)
	} catch (err) {
		console.log(err.message)
		res.status(400).send({ error: "Error", errorBody: JSON.stringify(err) })
	}
	res.status(200).send()
})

app.use(
	"/static",
	express.static(path.join(__dirname, "../client/build/static"))
)
app.get("/logos/:logoString", function(req, res) {
	let logoString = req.params.logoString
	res.sendFile(logoString, {
		root: path.join(__dirname, "../client/build/logos"),
	})
})

app.get("/mapicons/:mapString", function(req, res) {
	let mapString = req.params.mapString
	res.sendFile(mapString, {
		root: path.join(__dirname, "../client/build/mapicons"),
	})
})
//not gonna use this anymore, seems that polyfilling does the trick
app.get("/awesomiumbackup", function(req, res) {
	// if the client can't do modern javascript
	res.sendFile("awesomiumbackup.html", {
		root: path.join(__dirname, "../client/build/"),
	})
})

app.get("*", function(req, res) {
	res.sendFile("index.html", { root: path.join(__dirname, "../client/build/") })
})

const port = process.env.EXPRESS_PORT
app.listen(port, () => {
	console.info("Running on port " + port)
})
