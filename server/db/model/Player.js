import Wrapper from "./SchemaPromiseWrapper"

export default class Player extends Wrapper {
	async insertNewPlayer(steamid) {
		return await this.insert({
			_id: steamid,
			firstSeen: new Date(),
			lastSeen: new Date(),
			roundsWon: 0,
			kills: 0,
			deaths: 0,
		})
	}

	async exists(steamid) {
		return (await this.findOne({ _id: steamid })) !== null
	}

	async getPlayerData(steamid) {
		if (await this.exists(steamid)) {
			return await this.findOne({ _id: steamid })
		} else {
			return await this.insertNewPlayer(steamid)
		}
	}

	async updateKills(steamid, amountToAdd) {
		return await this.updateOne(
			{ _id: steamid },
			{ $inc: { kills: amountToAdd } }
		)
	}

	async updateDeaths(steamid, amountToAdd) {
		return await this.updateOne(
			{ _id: steamid },
			{ $inc: { deaths: amountToAdd } }
		)
	}

	async updateRoundsWon(steamid, amountToAdd) {
		return await this.updateOne(
			{ _id: steamid },
			{ $inc: { roundsWon: amountToAdd } }
		)
	}
}
