import React from "react"
import { Tag } from "bbcode-to-react"

export default class YoutubeTag extends Tag {
	toReact() {
		const attributes = {
			src: this.getContent(true),
			width: this.params.width || 420,
			height: this.params.height || 315,
		}
		return (
			<iframe
				title={"embed -> " + this.getContent(true)}
				{...attributes}
				frameBorder="0"
				allowFullScreen
			/>
		)
	}
}
