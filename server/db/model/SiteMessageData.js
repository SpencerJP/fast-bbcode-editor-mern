import Wrapper from "./SchemaPromiseWrapper"

export default class SiteMessageData extends Wrapper {
	async getString(id) {
		return await this.findOne({ _id: id })
	}
}
