export function getDiscordUserObject(object) {
	return {
		type: "GET_DISCORD_USER_OBJECT",
		payload: object,
	}
}

export function deleteDiscordUserObject() {
	return {
		type: "DELETE_DISCORD_USER_OBJECT",
		payload: null,
	}
}
