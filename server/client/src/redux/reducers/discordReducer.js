const initialState = {
	discordUserObject: null,
	authorizedUsers: [],
}

export default function(state = initialState, action) {
	switch (action.type) {
		case "GET_DISCORD_USER_OBJECT":
			return {
				...state,
				discordUserObject: action.payload,
			}
		case "DELETE_DISCORD_USER_OBJECT":
			return {
				...state,
				discordUserObject: null,
			}
		default:
			return state
	}
}
