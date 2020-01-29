import React from "react";
import { Tag } from "bbcode-to-react";

export default class NewLineTag extends Tag {
  toReact() {
    // using this.getComponents() to get children components.
    return <p>{this.getComponents()}</p>;
  }
}
