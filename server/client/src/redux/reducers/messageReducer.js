const initialState = {
	motd: null,
	loadingStatusMotd: true,
	loadingStatusEditBox: true,
}

export default function(state = initialState, action) {
	switch (action.type) {
		case "GET_MOTD":
			return {
				...state,
				motd: action.payload,
			}
		case "MOTD_SET_LOADING_STATUS":
			return {
				...state,
				loadingStatusMotd: action.payload,
			}
		case "EDITBOX_SET_LOADING_STATUS":
			return {
				...state,
				loadingStatusEditBox: action.payload,
			}
		default:
			return state
	}
}
