import React from "react"
import CustomLoader from "../components/common/CustomLoader"
import { Segment } from "semantic-ui-react"
import DiscordAuth from "../components/common/DiscordAuth"
import styled from "styled-components"

const StyledSegmentInner = styled(Segment)`
	&&& {
		padding: 40px;
		background-color: #222;
		border-radius: 20px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
`

export default function MOTDScreen(props) {
	const [isAuthorized, setIsAuthorized] = React.useState(null)
	const [bbComponentParent, setBbComponentParent] = React.useState(null)

	React.useEffect(() => {
		async function fetchBbCodeAndSet() {
			let response = await fetch("/rules")

			let data = await response.text()
			data = "[nl]" + data
			data = data.replace(/\n/g, "[/nl][nl]")
			// console.log(data)

			setBbComponentParent(props.parser.toReact(data))
			return data
		}
		try {
			fetchBbCodeAndSet()
		} catch (err) {
			console.error(err)
		}
	}, [props.parser])

	return (
		<div className="App">
			<div
				style={{
					backgroundColor: "#5c4949",
					padding: "20px",
					borderRadius: "20px",
				}}
			>
				<StyledSegmentInner>
					{bbComponentParent ? bbComponentParent : <CustomLoader style={{ height: "1000px" }} />}
				</StyledSegmentInner>
				<DiscordAuth isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />
			</div>
		</div>
	)
}
