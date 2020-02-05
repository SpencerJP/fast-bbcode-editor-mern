export default class SchemaPromiseWrapper {
	constructor(mongoose, schemaObject) {
		this[this.constructor.name + "Model"] = mongoose.model(
			this.constructor.name,
			new mongoose.Schema(schemaObject)
		)
	}
	async insert(obj) {
		const newObj = new this[this.constructor.name + "Model"](obj)
		await newObj.save()
		return newObj
	}

	async find(...args) {
		const query = this[this.constructor.name + "Model"].find(...args)
		const result = await query.exec()
		return result
	}

	async findOne(...args) {
		const query = this[this.constructor.name + "Model"].findOne(...args)
		const result = await query.exec()
		return result
	}
	async update(...args) {
		console.error("update (...args) deprecated")
		const query = this[this.constructor.name + "Model"].updateOne(...args)
		const result = await query.exec()
		return result
	}

	async updateOne(...args) {
		const query = this[this.constructor.name + "Model"].updateOne(...args)
		const result = await query.exec()
		return result
	}

	async updateMany(...args) {
		const query = this[this.constructor.name + "Model"].updateMany(...args)
		const result = await query.exec()
		return result
	}
}
