import React from "react"
import "./App.css"
import LineBreakTag from "./components/tags/LineBreakTag"
import CenterAlignmentTag from "./components/tags/CenterAlignmentTag"
import parser from "bbcode-to-react"
import MOTD from "./container/MOTD"

parser.registerTag("br", LineBreakTag) // new line tag
parser.registerTag("cent", CenterAlignmentTag) // new line tag

function App() {
	return <MOTD parser={parser} />
}

export default App
