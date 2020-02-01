import React from "react"
import { Segment, Button, Form } from "semantic-ui-react"
import { useWindowSize } from "../../hooks/useWindowSize"
import styled from "styled-components"

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
	const onChange = (e, { value }) => {
		e.preventDefault()
		props.setRawBBCode(value)
	}

	const handleClick = (e, ...args) => {
		e.preventDefault()
		fetch("/index", {
			method: "POST",
			body: props.rawBBCode,
		})
	}

	return (
		<Segment>
			<Form>
				<StyledTextArea
					type="text"
					defaultValue={props.rawBBCode}
					onChange={onChange}
					style={{ height: `${height - 100}px` }}
				/>
			</Form>
			<Button onClick={handleClick} color="blue" style={{ marginTop: "3px" }}>
				Save
			</Button>
		</Segment>
	)
}
