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
		let response = await fetch("/jailbreak/rules")

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

export function postMOTDData(rawBBCode, cookies) {
	return async function(dispatch) {
		dispatch(setLoadingStatusEditBox(true))
		dispatch(setLoadingStatusMotd(true))
		const body = {
			data: rawBBCode,
		}
		await fetch(`${window.REACT_APP_URL}/jailbreak/edit`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.discord_token}`,
			},
		})
		await dispatch(fetchMOTD())
		dispatch(setLoadingStatusMotd(false))
		dispatch(setLoadingStatusEditBox(false))
	}
}

export function postDemoData(rawBBCode) {
	return async function(dispatch) {
		dispatch(setLoadingStatusEditBox(true))
		dispatch(setLoadingStatusMotd(true))
		const body = {
			data: rawBBCode,
		}
		console.log(body)
		await fetch(`${window.REACT_APP_URL}/demoedit`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		})
		await dispatch(fetchDemo())
		dispatch(setLoadingStatusMotd(false))
		dispatch(setLoadingStatusEditBox(false))
	}
}

export function getDemo(string) {
	return {
		type: "GET_DEMO",
		payload: string,
	}
}

export function fetchDemo() {
	return async function(dispatch) {
		dispatch(setLoadingStatusMotd(true))
		dispatch(setLoadingStatusEditBox(true))
		let response = await fetch("/demodata")

		let data = await response.text()
		dispatch(getDemo(data))
		dispatch(setLoadingStatusMotd(false))
		dispatch(setLoadingStatusEditBox(false))
	}
}
