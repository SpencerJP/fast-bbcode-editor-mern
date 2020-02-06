import rootReducer from "./index"
import { getExpectedStateBuilder } from "./getExpectedState"

describe("discordReducer works as expected.", () => {
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

	const getExpectedState = getExpectedStateBuilder("discordReducer")

	beforeEach(() => {
		state = rootReducer(undefined, { type: undefined })
		action = {}
		payload = null
	})

	it("handles GET_DISCORD_USER_OBJECT correctly", () => {
		setMockPayload({
			id: "23123123131",
			username: "TestName",
			discriminator: 1234,
			avatar: "123123123123123123",
		})
		setMockAction("GET_DISCORD_USER_OBJECT", payload)
		const expectedState = getExpectedState(state, "discordUserObject", payload)
		expect(rootReducer(state, action)).toEqual(expectedState)
	})

	it("handles DELETE_DISCORD_USER_OBJECT correctly", () => {
		setMockPayload(null) // redundant but just here to clear confusion
		setMockAction("DELETE_DISCORD_USER_OBJECT", payload)
		const expectedState = getExpectedState(state, "discordUserObject", payload)
		expect(rootReducer(state, action)).toEqual(expectedState)
	})
})
