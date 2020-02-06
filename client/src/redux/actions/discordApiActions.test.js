import configureStore from "redux-mock-store"
import { getTestMiddleware } from "../store"
import * as discordApiActions from "./discordApiActions"

const mockStore = configureStore(getTestMiddleware())

describe("getDiscordUserObject works as intended", () => {
	it("updates the state in the store to the user object", () => {
		const initialState = {}
		const store = mockStore(initialState)

		const mockUser = {
			id: "23123123131",
			username: "TestName",
			discriminator: 1234,
			avatar: "123123123123123123",
		}

		store.dispatch(discordApiActions.getDiscordUserObject(mockUser))

		const actions = store.getActions()
		const expectedPayload = {
			type: "GET_DISCORD_USER_OBJECT",
			payload: mockUser,
		}
		expect(actions).toEqual([expectedPayload])
	})
})

describe("deleteDiscordUserObject works as intended", () => {
	it("updates the state in the store to be null", () => {
		const initialState = {}
		const store = mockStore(initialState)

		store.dispatch(discordApiActions.deleteDiscordUserObject())

		const actions = store.getActions()
		const expectedPayload = {
			type: "DELETE_DISCORD_USER_OBJECT",
			payload: null,
		}
		expect(actions).toEqual([expectedPayload])
	})
})
