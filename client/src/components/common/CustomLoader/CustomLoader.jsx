import React from "react"
import { Segment, Dimmer, Loader } from "semantic-ui-react"

export default function CustomLoader(props) {
	return (
		<Segment inverted={!props.inverted} style={props.style}>
			<Dimmer active>
				<Loader />
			</Dimmer>
		</Segment>
	)
}
