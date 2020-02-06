import React from "react"
import { Segment, Button, Form, Dimmer } from "semantic-ui-react"
import { useWindowSize } from "../../../hooks/useWindowSize"
import styled from "styled-components"
import { useCookies } from "react-cookie"
import { useDispatch, useSelector } from "react-redux"
import {
	getMOTD,
	postMOTDData,
} from "../../../redux/actions/messageActions"
import CustomLoader from "../CustomLoader/CustomLoader"

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
		dispatch(postMOTDData(rawBBCode, cookies))
	}

	const form = (<Form>
		<StyledTextArea
			type="text"
			defaultValue={rawBBCode}
			onChange={onChange}
			style={{ height: `${height - 100}px` }}
		/>
	</Form>)

	return (
		<Segment>
			{isLoading ?
				(<CustomLoader inverted
					style={{ height: `${height - 100}px` }}>{form}</CustomLoader>)
				:
				form
			}
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
