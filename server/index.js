import express from "express"
import discordApi from "./api/discord"
var fs = require("fs")
var cookieParser = require("cookie-parser")

var cookieSession = require("cookie-session")

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
	fs.readFile("./plaintextdata_placeholder/defaultmotd.bbcode", "utf8", function(err, data) {
		if (err) {
			res.status(400)
		} else {
			res.send(data)
		}
	})
})

app.use("/api/discord", discordApi)

app.get("/jbrules", (req, res) => {
	if (req.cookies) {
		console.log(req.cookies)
	}
	res.status(200).sendFile("index.html", { root })
})
app.listen(50451, () => {
	console.info("Running on port 50451")
})
