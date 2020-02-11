import SiteMessageData from "./model/SiteMessageData"
import DiscordApiTokens from "./model/DiscordApiTokens"
import DiscordAuthorizedUserIDs from "./model/DiscordAuthorizedUserIDs"
import Player from "./model/Player"
import JBMap from "./model/JBMap"
import PlayerSession from "./model/PlayerSession"

var globalLayer

var mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

var mongoDB = mongoose.connection
mongoDB.on("error", console.error.bind(console, "connection error:"))
mongoDB.once("open", function() {
	console.info("Mongo Connected")
})

class MongoConnectionLayer {
	constructor(mongoose) {
		this.mongoose = mongoose
	}
	async setupTables() {
		this.playersModel = new Player(this.mongoose, {
			_id: String, // steamid
			firstSeen: Date,
			lastSeen: Date,
			roundsWon: Number,
			kills: Number,
			deaths: Number,
			isInTheDiscord: Boolean,
			isInTheSteamGroup: Boolean,
		})
		// this.playerSessionsModel = new PlayerSession(this.mongoose, {
		// 	player_id: String, // steamid
		// 	timeJoined: Date,
		// 	timeLeft: Date,
		// })
		this.mapsModel = new JBMap(this.mongoose, {
			_id: String, // map filename
			prisonerWins: Number,
			guardWins: Number,
			timesPlayed: Number,
		})
		this.siteMessageDataModel = new SiteMessageData(this.mongoose, {
			_id: String,
			string: String,
		})
		this.discordApiTokens = new DiscordApiTokens(this.mongoose, {
			_id: String,
			refresh_token: String,
		})
		this.discordAuthorizedUserIDs = new DiscordAuthorizedUserIDs(
			this.mongoose,
			{
				_id: String,
			}
		)
		return this.siteMessageDataModel.getSiteMOTD()
	}

	async getAuthedUsers() {
		let result = await this.discordAuthorizedUserIDs.find({})
		return result
	}

	async userIsSiteAdmin(userID) {
		return (await this.discordAuthorizedUserIDs.find({ _id: userID })) !== null
	}
	async addDiscordToken(access_token, refresh_token) {
		try {
			return await this.discordApiTokens.insert({
				_id: access_token,
				refresh_token: refresh_token,
			})
		} catch (err) {}
	}
}

const getMongoConnectionLayer = () => {
	if (!globalLayer) {
		globalLayer = new MongoConnectionLayer(mongoose)
		globalLayer.setupTables()
	}
	return globalLayer
}

export default getMongoConnectionLayer
