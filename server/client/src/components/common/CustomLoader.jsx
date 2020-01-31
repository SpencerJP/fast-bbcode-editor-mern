import React from "react"
import { Segment, Dimmer, Loader } from "semantic-ui-react"

export default function CustomLoader() {
	return (
		<Segment style={{ height: "1000px" }}>
			<Dimmer active>
				<Loader />
			</Dimmer>
		</Segment>
	)
}
