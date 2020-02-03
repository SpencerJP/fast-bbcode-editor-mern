import { Router } from "express"
import DB from "../db/connect"
import fetch from "node-fetch"
import btoa from "btoa"

const router = Router()
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = `${process.env.REACT_APP_URL}/api/discord/callback`
const redirect = encodeURIComponent(REDIRECT_URL)

var db = new DB(
	process.env.MYSQL_HOST,
	process.env.MYSQL_USER,
	process.env.MYSQL_PASSWORD,
	process.env.MYSQL_DB
)

router.get("/login", (req, res) => {
	res.redirect(
		`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`
	)
})

router.get("/callback", async (req, res) => {
	try {
		if (!req.query.code) throw new Error("NoCodeProvided")
		const code = req.query.code
		const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
		const response = await fetch(
			`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
			{
				method: "POST",
				headers: {
					Authorization: `Basic ${creds}`,
				},
			}
		)
		const json = await response.json()
		if (json.access_token && json.refresh_token) {
			db.queryWithCustomErrorHandler(
				err => {
					if (!err.message.includes("ER_DUP_ENTRY")) {
						throw err
					}
				},
				`INSERT INTO DISCORD_API_TOKENS VALUES(?, ?)`,
				[json.access_token, json.refresh_token]
			)
		}
		res.cookie("discord_token", json.access_token, {
			maxAge: 900000,
			httpOnly: false,
		})
		if (process.env.NODE_ENV !== "production") {
			// workaround to allow for dev work
			res.redirect(`${process.env.REACT_APP_FRONTEND_URL}`)
		} else {
			res.redirect("/index")
		}
	} catch (err) {
		console.log(err)
		res.status(400).send("Could not authorise discord.")
	}
})

export default router
