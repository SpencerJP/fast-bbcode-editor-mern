import React from "react"
import { Segment, Button, Form } from "semantic-ui-react"
import { useWindowSize } from "../../../hooks/useWindowSize"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { getDemo, postDemoData } from "../../../redux/actions/messageActions"
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
	const rawBBCode = useSelector(state => state.messageReducer.demo)
	const isLoading = useSelector(
		state => state.messageReducer.loadingStatusEditBox
	)
	const dispatch = useDispatch()
	const onChange = (e, { value }) => {
		e.preventDefault()
		dispatch(getDemo(value))
	}

	const handleClick = async e => {
		e.preventDefault()
		dispatch(postDemoData(rawBBCode))
	}

	const form = (
		<Form>
			<StyledTextArea
				type="text"
				defaultValue={rawBBCode}
				onChange={onChange}
				style={{ height: `${height - 100}px` }}
			/>
		</Form>
	)

	return (
		<Segment>
			{isLoading ? (
				<CustomLoader inverted style={{ height: `${height - 100}px` }}>
					{form}
				</CustomLoader>
			) : (
				form
			)}
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
