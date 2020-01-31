import React from "react"
import "./App.css"
import NewLineTag from "./components/tags/NewLineTag"
import CenterAlignmentTag from "./components/tags/CenterAlignmentTag"
import parser from "bbcode-to-react"
import MOTD from "./container/MOTD"

parser.registerTag("nl", NewLineTag) // new line tag
parser.registerTag("cent", CenterAlignmentTag) // new line tag

function App() {
	return <MOTD parser={parser} />
}

export default App
