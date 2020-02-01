import mysql from "promise-mysql"
const fs = require("fs")
const { promisify } = require("util")

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

export default class MySQLConnection {
	constructor(host, user, password, db, port = 3306) {
		this.dbConfig = {
			host: host,
			user: user,
			port: port,
			password: password,
			database: db,
		}
	}

	async setupTables() {
		let rows
		await this.query(`CREATE TABLE IF NOT EXISTS SITE_MESSAGE_DATA (
            id varchar(25) NOT NULL,
            PRIMARY KEY(id),
            string mediumtext not null
		)`)

		await this.query(`CREATE TABLE IF NOT EXISTS WEBSITE_ACCESS_DISCORD_IDS (
            discord_id varchar(40) NOT NULL,
			PRIMARY KEY(discord_id)
		)`)

		await this.query(`CREATE TABLE IF NOT EXISTS DISCORD_API_TOKENS (
            discord_token varchar(40) NOT NULL,
			PRIMARY KEY(discord_token),
			refresh_token varchar(40) NOT NULL
		)`)

		rows = await this.query(`SELECT *
         FROM SITE_MESSAGE_DATA
         WHERE id = "motd"`)
		if (!rows.length) {
			const data = await readFileAsync("./plaintextdata_placeholder/defaultmotd.bbcode", "utf8")
			rows = await this.query(
				`INSERT INTO SITE_MESSAGE_DATA
                    VALUES("motd", ?)`,
				[data]
			)
			rows = await this.query(`SELECT *
                                    FROM SITE_MESSAGE_DATA
                                    WHERE id = "motd"`)

			if (!rows.length) {
				throw new Error("Insert statement didn't work?")
			}
		}

		return rows
	}

	async query(...query) {
		let result
		let conn
		try {
			conn = await mysql.createConnection(this.dbConfig)
			result = await conn.query(...query)
			if (conn && conn.end) {
				conn.end()
			}
		} catch (err) {
			conn.end()
			throw err
		}
		return result
	}

	async getAuthedUsers() {
		return await this.query(`SELECT * FROM WEBSITE_ACCESS_DISCORD_IDS`)
	}

	async getSiteMOTD() {
		let rows = await this.query(`SELECT *
		FROM SITE_MESSAGE_DATA
		WHERE id = "motd"`)
		return rows[0].string
	}
}
