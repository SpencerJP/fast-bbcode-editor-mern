import Wrapper from "./SchemaPromiseWrapper"

export default class SiteMessageData extends Wrapper {
	async getString(id) {
		return await this.findOne({ _id: id })
	}

	async updateMotd(string) {
		return await this.updateOne({ _id: "motd" }, { string: string })
	}

	async getSiteMOTD() {
		let motdObj = await this.getString("motd")
		return motdObj.string
	}

	async updateDemo(string) {
		return await this.updateOne({ _id: "demo" }, { string: string })
	}

	async getDemo() {
		let demoObj = await this.getString("demo")
		return demoObj.string
	}
}
