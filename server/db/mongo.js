import SiteMessageData from "./model/SiteMessageData"
import DiscordApiTokens from "./model/DiscordApiTokens"
import DiscordAuthorizedUserIDs from "./model/DiscordAuthorizedUserIDs"

var globalLayer

var mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

var mongoDB = mongoose.connection
mongoDB.on("error", console.error.bind(console, "connection error:"))
mongoDB.once("open", function () {
	console.info("Mongo Connected")
})

class MongoConnectionLayer {
	constructor(mongoose) {
		this.mongoose = mongoose
	}
	async setupTables() {
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
		return this.getSiteMOTD()
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
		} catch (err) { }
	}

	async updateMotd(string) {
		return await this.siteMessageDataModel.update(
			{ _id: "motd" },
			{ string: string }
		)
	}

	async getSiteMOTD() {
		let motdObj = await this.siteMessageDataModel.findOne({ _id: "motd" })
		return motdObj.string
	}

	async updateDemo(string) {
		return await this.siteMessageDataModel.update(
			{ _id: "demo" },
			{ string: string }
		)
	}

	async getDemo() {
		let demoObj = await this.siteMessageDataModel.findOne({ _id: "demo" })
		if (demoObj === null) {
			this.siteMessageDataModel.insert({
				_id: "demo",
				string: "",
			})
			return ""
		}
		return demoObj.string
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
