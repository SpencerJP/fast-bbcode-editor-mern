export function getMOTD(string) {
	return {
		type: "GET_MOTD",
		payload: string,
	}
}

export function fetchMOTD() {
	return async function(dispatch) {
		dispatch(setLoadingStatusMotd(true))
		dispatch(setLoadingStatusEditBox(true))
		let response = await fetch("/rules")

		let data = await response.text()
		dispatch(getMOTD(data))
		dispatch(setLoadingStatusMotd(false))
		dispatch(setLoadingStatusEditBox(false))
	}
}

export function setLoadingStatusMotd(boolean) {
	return {
		type: "MOTD_SET_LOADING_STATUS",
		payload: boolean,
	}
}

export function setLoadingStatusEditBox(boolean) {
	return {
		type: "EDITBOX_SET_LOADING_STATUS",
		payload: boolean,
	}
}
