import express from "express"
import { join } from "path"
import discordApi from "./api/discord"
var fs = require("fs")

const app = express()

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

app.get("*", (req, res) => {
	res.status(200).sendFile(join(__dirname, "index.html"))
})

app.listen(50451, () => {
	console.info("Running on port 50451")
})
