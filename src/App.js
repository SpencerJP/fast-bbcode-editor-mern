import React from "react";
import "./App.css";
import parser, { Tag } from "bbcode-to-react";
import { Accordion, Segment, Dimmer, Loader } from "semantic-ui-react";

function CustomLoader() {
  return <Segment>
    <Dimmer active>
      <Loader />
    </Dimmer>
  </Segment>
}

class NewLineTag extends Tag {
  toReact() {
    // using this.getComponents() to get children components.
    return (
      <p>{this.getComponents()}</p>
    );
  }
}
parser.registerTag('nl', NewLineTag); // replace exists tag


function App() {

  const [bbComponentParent, setBbComponentParent] = React.useState(null)

  React.useEffect(() => {
    async function fetchBbCodeAndSet() {
      let response = await fetch("defaultmotd.bbcode")
      let data = await response.text()
      setBbComponentParent(parser.toReact(data))
      return data
    }
    try {
      fetchBbCodeAndSet()
    }
    catch (err) {
      console.error(err)
    }
  }, [])


  return (
    <div className="App">
      <Accordion>
        {bbComponentParent || <CustomLoader />}
      </Accordion>
    </div>
  );
}

export default App;
