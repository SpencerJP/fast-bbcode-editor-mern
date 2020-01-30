import React from "react"
import "./App.css"
import parser from "bbcode-to-react"
import CustomLoader from "../components/common/CustomLoader"
import NewLineTag from "../components/tags/NewLineTag"
import CenterAlignmentTag from "../components/tags/CenterAlignmentTag"
import { Segment } from "semantic-ui-react"

parser.registerTag("nl", NewLineTag) // new line tag
parser.registerTag("cent", CenterAlignmentTag) // new line tag

function App() {
	const [bbComponentParent, setBbComponentParent] = React.useState(null)

	React.useEffect(() => {
		async function fetchBbCodeAndSet() {
			let response = await fetch("/rules")

			let data = await response.text()
			data = "[nl]" + data
			data = data.replace(/\n/g, "[/nl][nl]")
			// console.log(data)

			setBbComponentParent(parser.toReact(data))
			return data
		}
		try {
			fetchBbCodeAndSet()
		} catch (err) {
			console.error(err)
		}
	}, [])

	return (
		<div className="App">
			<div
				style={{
					backgroundColor: "#583939",
					padding: "20px",
					borderRadius: "20px",
				}}
			>
				<Segment
					style={{
						padding: "40px",
						backgroundColor: "#222",
						borderRadius: "20px",
					}}
				>
					{bbComponentParent ? bbComponentParent : <CustomLoader />}
				</Segment>
			</div>
		</div>
	)
}

export default App
