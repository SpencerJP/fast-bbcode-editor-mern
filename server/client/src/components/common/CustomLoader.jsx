import React from "react"
import { Segment, Dimmer, Loader } from "semantic-ui-react"

export default function CustomLoader(props) {
	return (
		<Segment style={props.style}>
			<Dimmer active>
				<Loader />
			</Dimmer>
		</Segment>
	)
}
