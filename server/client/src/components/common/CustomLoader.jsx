import React from "react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";

export default function CustomLoader() {
  return (
    <Segment>
      <Dimmer active>
        <Loader />
      </Dimmer>
    </Segment>
  );
}
