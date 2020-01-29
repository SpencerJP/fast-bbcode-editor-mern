import React from "react";
import "./App.css";
import parser, { Tag } from "bbcode-to-react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";

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

class CenterAlignment extends Tag {
  toReact() {
    // using this.getComponents() to get children components.
    return (
      <div style={{ textAlign: "center" }}>{this.getComponents()}</div>
    );
  }
}
parser.registerTag('nl', NewLineTag); // new line tag
parser.registerTag('cent', CenterAlignment); // new line tag


function App() {

  const [bbComponentParent, setBbComponentParent] = React.useState(null)

  React.useEffect(() => {
    async function fetchBbCodeAndSet() {
      let response = await fetch("defaultmotd.bbcode")

      let data = await response.text()
      data = "[nl]" + data
      data = data.replace(/\n/g, "[/nl][nl]")
      console.log(data)

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
      <div style={{ backgroundColor: "#583939", padding: "20px", borderRadius: "20px" }}>
        <Segment style={{ padding: "40px", backgroundColor: "#222", borderRadius: "20px" }}>
          {bbComponentParent ? bbComponentParent : <CustomLoader />}
        </Segment>
      </div>
    </div>
  );
}

export default App;
