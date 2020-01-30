import express from "express"
import discordApi from "./api/discord"
var session = require("express-session")
var cookieParser = require("cookie-parser")
var fs = require("fs")

const app = express()
app.use(cookieParser())
app.use(
	session({
		secret: "test1",
		name: "test1",
		resave: true,
		saveUninitialized: true,
	})
)

app.get("/rules", async (req, res) => {
	fs.readFile("./plaintextdata_placeholder/defaultmotd.bbcode", "utf8", function(err, data) {
		if (err) {
			res.status(400)
		} else {
			res.send(data)
		}
	})
})

app.use("/api/discord", discordApi)

const root = require("path").join(__dirname, "client", "build")
app.use(express.static(root))
app.get("*", (req, res) => {
	if (req.session.page_views) {
		req.session.page_views++
		console.log("You visited this page " + req.session.page_views + " times")
	} else {
		req.session.page_views = 1
		console.log("Welcome to this page for the first time!")
	}
	res.status(200).sendFile("index.html", { root })
})

app.listen(50451, () => {
	console.info("Running on port 50451")
})
