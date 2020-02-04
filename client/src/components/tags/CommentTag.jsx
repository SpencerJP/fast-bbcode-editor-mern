import React from "react"
import { Tag } from "bbcode-to-react"

export default class CommentTag extends Tag {
    toReact() {
        // using this.getComponents() to get children components.
        return <></>
    }
}
