import React from "react"
// import Media from "react-media"
import { useWindowSize } from "../../hooks/useWindowSize"
import styled from "styled-components"
import "./LoadingScreen.css"
import LoadingAnim from "./LoadingAnim"
import { Grid, Header } from "semantic-ui-react"
import { useQueryParam, StringParam } from "use-query-params"
import SteamSignature from "./SteamSignature"

const EXTERNAL_MARGIN = 50

const ExternalDiv = styled.div`
	margin: 0 auto 0 auto;
	background: #feac5e; /* fallback for old browsers */
	background: -webkit-linear-gradient(
		to right,
		#4bc0c8,
		#c779d0,
		#feac5e
	); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(
		to right,
		#4bc0c8,
		#c779d0,
		#feac5e
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

	height: ${props => props.height - EXTERNAL_MARGIN}px;
	width: ${props => props.width - EXTERNAL_MARGIN}px;
	min-height: ${props => props.height - EXTERNAL_MARGIN}px;
	min-width: ${props => props.width - EXTERNAL_MARGIN}px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	border-radius: 15px;
	overflow: hidden;
	display: flex;
	align-items: center; // vertically centers
	justify-content: center;
	text-align: center;
`

// fakes a margin-top without adding a scroll bar
const WrapperDiv = styled.div`
	padding-top: ${EXTERNAL_MARGIN / 2}px;
`

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

const GridRow = styled(Grid.Row)`
	@@@ {
		// TODO
	}
`
const SubHeaders = props => {
	return <h4 className="loading-screen-sub-headers">{props.children}</h4>
}
export default function LoadingScreen(props) {
	const windowSize = useWindowSize()
	const [steamid] = useQueryParam("steamid", StringParam)
	const [map] = useQueryParam("map", StringParam)
	console.log(steamid)
	console.log(map)
	return (
		<WrapperDiv>
			<ExternalDiv
				className="backup-external-div"
				height={windowSize.height}
				width={windowSize.width}
			>
				<Grid columns="three" style={{ height: "90%", width: "90%" }}>
					<GridRow>
						<Grid.Column></Grid.Column>
						<Grid.Column>
							<img src="https://i.imgur.com/dj9zIsQ.png" alt="Redux Logo"></img>
						</Grid.Column>
						<Grid.Column />
					</GridRow>
					<GridRow>
						<Grid.Column>
							{!process.env.NODE_ENV ||
								(process.env.NODE_ENV === "development" && (
									<CenterContents>
										<Header className="loading-screen-welcome">
											Welcome Back!
										</Header>
										{steamid && <SteamSignature steamid={steamid} />}
										<SubHeaders>Time Played: 56 Hours</SubHeaders>
										<SubHeaders>K: 1 D: 1 K/D: 4.0 </SubHeaders>
										<SubHeaders>Last Seen: 10/2/20</SubHeaders>
										<SubHeaders>Rounds Won: 40</SubHeaders>
									</CenterContents>
								))}
						</Grid.Column>
						<Grid.Column>
							<LoadingAnim />
						</Grid.Column>
						<Grid.Column />
					</GridRow>
				</Grid>
			</ExternalDiv>
		</WrapperDiv>
	)
}

/* code to copy in for media queries
<Media
				queries={{
					small: "(max-width: 599px)",
					medium: "(min-width: 600px) and (max-width: 1199px)",
					large: "(min-width: 1200px)",
				}}
			>
				{matches => (
					<>
						{matches.small && <p>I am small!</p>}
						{matches.medium && <p>I am medium!</p>}
						{matches.large && <p>I am large!</p>}
					</>
				)}
            </Media>
            */
