import { Router } from "express"
import fetch from "node-fetch"
import btoa from "btoa"

const router = Router()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const redirect = encodeURIComponent("http://localhost:50451/api/discord/callback")

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
		console.log(json)
		res.redirect(`/?token=${json.access_token}`)
	} catch (err) {
		console.log(err)
		res.status(400).send("Could not authorise discord.")
	}
})

export default router
