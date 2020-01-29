import React from "react";
import "./App.css";
import parser from "bbcode-to-react";
import { Accordion } from "semantic-ui-react";
// const file = require("../defaultmotd.bbcode");
var FileReader = require("FileReader"),
  fileReader = new FileReader();
function App() {
  return (
    <div className="App">
      <Accordion>
        {parser.toReact(
          fileReader.readTextFile(new File("./defaultmotd.bbcode"))
        )}
      </Accordion>
    </div>
  );
}

export default App;
