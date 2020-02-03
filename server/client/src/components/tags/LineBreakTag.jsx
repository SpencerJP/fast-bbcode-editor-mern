import React from "react"
import { Tag } from "bbcode-to-react"

export default class LineBreakTag extends Tag {
	toReact() {
		// using this.getComponents() to get children components.
		return (
			<>
				{this.getComponents()}
				<br />
			</>
		)
	}
}
