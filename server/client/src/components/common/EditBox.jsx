import React from "react"
import { Segment, Button, Form } from "semantic-ui-react"
import { useWindowSize } from "../../hooks/useWindowSize"
import styled from "styled-components"
import { useCookies } from "react-cookie"
import { useDispatch, useSelector } from "react-redux"
import { getMOTD, fetchMOTD } from "../../redux/actions/messageActions"

const StyledTextArea = styled(Form.TextArea)`
	font-family: Tahoma, Verdana, Segoe, sans-serif;
	font-size: 16px;
	font-style: normal;
	font-variant: normal;
	font-weight: 700;
	line-height: 26.4px;
`

export default function EditBox(props) {
	const { height } = useWindowSize()
	const rawBBCode = useSelector(state => state.messageReducer.motd)
	const isLoading = useSelector(
		state => state.messageReducer.loadingStatusEditBox
	)
	const [cookies] = useCookies(["discord_token"])
	const dispatch = useDispatch()
	const onChange = (e, { value }) => {
		e.preventDefault()
		dispatch(getMOTD(value))
	}

	const handleClick = async e => {
		e.preventDefault()
		await fetch("/edit", {
			method: "POST",
			body: props.rawBBCode,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${cookies.discord_token}`,
			},
		})
		dispatch(fetchMOTD())
	}

	return (
		<Segment>
			<Form>
				<StyledTextArea
					type="text"
					defaultValue={rawBBCode}
					onChange={onChange}
					style={{ height: `${height - 100}px` }}
				/>
			</Form>
			<Button
				onClick={handleClick}
				color="blue"
				style={{ marginTop: "3px" }}
				loading={isLoading}
			>
				Save
			</Button>
		</Segment>
	)
}
