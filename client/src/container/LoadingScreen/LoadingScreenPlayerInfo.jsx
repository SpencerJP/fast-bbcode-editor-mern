import React from "react"
import { Header } from "semantic-ui-react"
import SteamSignature from "./SteamSignature"

const SubHeaders = props => {
	return <h4 className="loading-screen-sub-headers">{props.children}</h4>
}

const CenterContents = props => {
	let secondMap = []
	return (
		<table width="100%" height="100%" valign="center">
			{props.children &&
				props.children.map(child => {
					if (child && child.giveOwnRow) {
						return (
							<tr style={{ border: "none" }}>
								<td style={{ textAlign: "left" }}>{child}</td>
							</tr>
						)
					} else {
						secondMap.push(child)
						return null
					}
				})}
			<tr>
				<td style={{ textAlign: "left" }}>{secondMap}</td>
			</tr>
		</table>
	)
}

export const LoadingScreenPlayerInfo = props => {
	return (
		<CenterContents>
			<Header className="loading-screen-welcome">Welcome Back!</Header>
			{props.steamid && <SteamSignature steamid={props.steamid} />}
			<SubHeaders>Time Played: 56 Hours</SubHeaders>
			<SubHeaders>K: 1 D: 1 K/D: 4.0 </SubHeaders>
			<SubHeaders>Last Seen: 10/2/20</SubHeaders>
			<SubHeaders>Rounds Won: 40</SubHeaders>
		</CenterContents>
	)
}
