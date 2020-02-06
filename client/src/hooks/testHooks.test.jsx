import { useOnMountFetch } from "./useOnMountFetch"
import React from "react"
import { useDispatch, Provider, useSelector } from "react-redux"
import fetchMock from "fetch-mock"
import { getNewStore } from "../redux/store"
import { fetchMOTD } from "../redux/actions/messageActions"
import renderer from "react-test-renderer"

function DummyComponent() {
	const dispatch = useDispatch()
	const motd = useSelector(state => state.messageReducer.motd)
	const mockString = "[comment][size=85]STUFF[/size][/comment]"
	fetchMock.mock(/\/rules/i, mockString, {
		delay: 1000,
	})
	useOnMountFetch(dispatch, fetchMOTD)
	return <p>{motd}</p>
}

function DummyComponent2() {
	const dispatch = useDispatch()
	const motd = useSelector(state => state.messageReducer.motd)
	const mockString = "[comment][size=85]STUFF[/size][/comment]"
	fetchMock.mock(/\/rules/i, mockString, {
		delay: 1000,
	})
	useOnMountFetch(dispatch, [fetchMOTD])
	return <p>{motd}</p>
}

describe("Test that useOnMountFetch is working", () => {
	let store = getNewStore()
	beforeEach(() => {
		store = getNewStore()
	})
	it("renders and successfully fetches with useOnMountFetch(dispatch, fetchMOTD)", () => {
		let component = renderer.create(
			<Provider store={store}>
				<DummyComponent />
			</Provider>
		)
		function callback() {
			let tree = component.toJSON()
			expect(tree).toMatchSnapshot()
		}
		setTimeout(() => {
			callback()
		}, 1001)
	})

	it("renders and successfully fetches with useOnMountFetch(dispatch, [fetchMOTD])", () => {
		let component = renderer.create(
			<Provider store={store}>
				<DummyComponent2 />
			</Provider>
		)
		function callback() {
			let tree = component.toJSON()
			expect(tree).toMatchSnapshot()
		}
		setTimeout(() => {
			callback()
		}, 1001)
	})
})
