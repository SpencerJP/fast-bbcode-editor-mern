import rootReducer from "./index"
import { getExpectedStateBuilder } from "./getExpectedState"

describe("messageReducer works as expected.", () => {
	let action = {}
	let payload = null
	let state = rootReducer(undefined, { type: undefined })
	function setMockAction(type, payload) {
		action = {
			type: type,
			payload: payload,
		}
	}

	function setMockPayload(obj) {
		payload = obj
	}

	const getExpectedState = getExpectedStateBuilder("messageReducer")

	beforeEach(() => {
		state = rootReducer(undefined, { type: undefined })
		action = {}
		payload = null
	})

	it("handles GET_MOTD correctly", () => {
		setMockPayload("[comment][size=85]STUFF[/size][/comment]")
		setMockAction("GET_MOTD", payload)
		const expectedState = getExpectedState(state, "motd", payload)

		expect(rootReducer(state, action)).toEqual(expectedState)
	})

	it("handles MOTD_SET_LOADING_STATUS correctly", () => {
		setMockPayload(false)
		setMockAction("MOTD_SET_LOADING_STATUS", payload)
		const expectedState = getExpectedState(state, "loadingStatusMotd", payload)
		expect(rootReducer(state, action)).toEqual(expectedState)
	})

	it("handles EDITBOX_SET_LOADING_STATUS correctly", () => {
		setMockPayload(false)
		setMockAction("EDITBOX_SET_LOADING_STATUS", payload)
		const expectedState = getExpectedState(
			state,
			"loadingStatusEditBox",
			payload
		)
		expect(rootReducer(state, action)).toEqual(expectedState)
	})
})
