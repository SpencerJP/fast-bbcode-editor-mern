import configureStore from "redux-mock-store"
import fetchMock from "fetch-mock"
import { getTestMiddleware } from "../store"
import * as messageActions from "./messageActions"

const mockStore = configureStore(getTestMiddleware())

describe("messageActions works as intended", () => {
	const initialState = {}
	let store = mockStore(initialState)

	beforeEach(() => {
		store = mockStore(initialState)
	})
	it("getMOTD works as intended", () => {
		const mockString = "TESTEEETSRSTWTSDRSDFSDFSDF"

		store.dispatch(messageActions.getMOTD(mockString))

		const actions = store.getActions()
		const expectedPayload = {
			type: "GET_MOTD",
			payload: mockString,
		}
		expect(actions).toEqual([expectedPayload])
	})
	it("setLoadingStatusMotd works as intended", () => {
		store.dispatch(messageActions.setLoadingStatusMotd(true))

		const actions = store.getActions()
		const expectedPayload = {
			type: "MOTD_SET_LOADING_STATUS",
			payload: true,
		}
		expect(actions).toEqual([expectedPayload])
	})

	it("setLoadingStatusEditBox works as intended", () => {
		store.dispatch(messageActions.setLoadingStatusEditBox(true))

		const actions = store.getActions()
		const expectedPayload = {
			type: "EDITBOX_SET_LOADING_STATUS",
			payload: true,
		}
		expect(actions).toEqual([expectedPayload])
	})

	it("fetchMOTD works as intended", async () => {
		const mockString = "[comment][size=85]STUFF[/size][/comment]"
		fetchMock.mock(/\/rules/i, mockString, {
			delay: 1000,
		})
		await store.dispatch(messageActions.fetchMOTD(true))
		const motdLoadingTrue = {
			type: "MOTD_SET_LOADING_STATUS",
			payload: true,
		}
		const editboxLoadingTrue = {
			type: "EDITBOX_SET_LOADING_STATUS",
			payload: true,
		}
		const motdLoadingFalse = {
			type: "MOTD_SET_LOADING_STATUS",
			payload: false,
		}
		const editboxLoadingFalse = {
			type: "EDITBOX_SET_LOADING_STATUS",
			payload: false,
		}

		const getMOTDPayload = {
			type: "GET_MOTD",
			payload: mockString,
		}

		const actions = store.getActions()
		expect(actions).toEqual([
			motdLoadingTrue,
			editboxLoadingTrue,
			getMOTDPayload,
			motdLoadingFalse,
			editboxLoadingFalse,
		])
		fetchMock.reset()
	})
})
