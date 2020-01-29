import React from "react";
import "./App.css";
import parser from "bbcode-to-react";
import { Accordion } from "semantic-ui-react";
const file = require("../defaultmotd.bbcode");
const fileReader = require("FileReader");

function App() {
  return (
    <div className="App">
      <Accordion>{parser.toReact(fileReader.readTextFile(file))}</Accordion>
    </div>
  );
}

export default App;
