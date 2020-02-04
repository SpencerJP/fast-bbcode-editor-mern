import React from "react"
import { Tag } from "bbcode-to-react"

export default class CenterAlignmentTag extends Tag {
	toReact() {
		// using this.getComponents() to get children components.
		return <center>{this.getComponents()}</center>
	}
}
