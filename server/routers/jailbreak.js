import { Router } from "express"
import MongoDB from "../db/mongo"
import fetch from "node-fetch"

const router = Router()
var jsonBodyParser = require("body-parser").json()
var cookieParser = require("cookie-parser")
const mongoDB = MongoDB()

router.use(cookieParser())

router.get("/rules", async (req, res) => {
	try {
		let string = await mongoDB.siteMessageDataModel.getSiteMOTD()
		res.status(200).send(string)
	} catch (err) {
		res.status(400).send(err)
	}
})

router.get("/index", (req, res) => {
	res.status(200).sendFile("index.html", { root })
})

router.get("/authedusers", async function(req, res) {
	try {
		let result = await mongoDB.getAuthedUsers()
		res.status(200).send(result)
	} catch (err) {
		res.status(400).send(err)
	}
})

router.post("/edit", jsonBodyParser, async function(req, res, next) {
	try {
		let discord_token = req.cookies.discord_token
		if (!discord_token) {
			if (req.headers.authorization) {
				discord_token = req.headers.authorization.split(" ").pop()
			} else {
				throw new Error("Issue finding cookie from client.")
			}
		}
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
				await mongoDB.siteMessageDataModel.updateMotd(updatedText)
			} else {
				throw new Error("User doesn't have permission.")
			}
		} else {
			throw new Error("Discord failed to authorize this user.")
		}
	} catch (err) {
		res.status(400).send({ error: "Error", errorBody: JSON.stringify(err) })
	}
	next()
})

export default router
