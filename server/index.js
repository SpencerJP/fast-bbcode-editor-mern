import express from "express"
import discordApi from "./api/discord"
import DB from "./db/connect"
var cookieParser = require("cookie-parser")

var cookieSession = require("cookie-session")

var db = new DB(
	process.env.MYSQL_HOST,
	process.env.MYSQL_USER,
	process.env.MYSQL_PASSWORD,
	process.env.MYSQL_DB
)

// db.query(`IF NOT EXISTS (SELECT * FROM sitemessages)
//     CREATE TABLE sitemessages (
// 		identifer varchar(25) not null,
//         string mediumtext not null
//     )
// GO
// `)

const app = express()
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", process.env.REACT_URL) // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})
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
	try {
		let rows = await db.query(`SELECT string
		FROM SITE_MESSAGE_DATA
		WHERE id = "motd"`)
		res.status(200).send(rows[0].string)
	} catch (err) {
		res.status(400).send(err)
	}
})

app.use("/api/discord", discordApi)

app.get("/index", (req, res) => {
	if (req.cookies) {
		console.log(req.cookies)
	}
	res.status(200).sendFile("index.html", { root })
})

app.get("/setup", async (req, res) => {
	try {
		let rows = await db.setupTables()
		res.status(200).send(rows)
	} catch (err) {
		res.status(400).send(err)
	}
})

app.post("/edit", function(req, res) {
	res.send("POST request to the homepage")
})

app.listen(3005, () => {
	console.info("Running on port 3005")
})
