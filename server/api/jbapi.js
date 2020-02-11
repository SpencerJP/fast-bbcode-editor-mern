import { Router } from "express"
import MongoDB from "../db/mongo"

const router = Router()

const mongoDB = MongoDB()

router.get("/users/:steamid", async (req, res) => {
	let steamid = req.params.steamid
	try {
		let user = await mongoDB.playersModel.getPlayerData(steamid)
		res.status(200).send(user)
	} catch (err) {
		console.error(err)
		res.status(400).send({ Error: err.message })
	}
})

export default router
