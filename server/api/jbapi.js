import { Router } from "express"
import MongoDB from "../db/mongo"

const router = Router()

const mongoDB = MongoDB()

router.get("/users/:steamid", async (req, res) => {
	let steamid = req.params.steamid
})

export default router
