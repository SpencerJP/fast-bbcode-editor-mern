import React from "react"
// import Media from "react-media"
import { useWindowSize } from "../hooks/useWindowSize"
import styled from "styled-components"
import "./LoadingScreen.css"

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

const InternalDiv = styled.div`
	background: #f96b6b;
	border-radius: 15px;
	height: 100%;
	width: 100%;
	display: block;
	text-align: center;
	box-shadow: 0 0 5px 10px #f96b6b;
	transform: translateY(20px);
`

const StyledTD = styled.td`
	min-height: 310px;
	min-width: 561px;
	height: 310px;
	width: 561px;
`

const ServerHeader = styled.h1`
	font-family: "Encode Sans Semi Expanded", sans-serif;
	font-size: 90px;
	display: table-cell;
	vertical-align: middle;
	color: white;
	line-height: 90px;
	text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
`

// fakes a margin-top without adding a scroll bar
const WrapperDiv = styled.div`
	padding-top: ${EXTERNAL_MARGIN / 2}px;
`

export default function LoadingScreen() {
	const windowSize = useWindowSize()
	return (
		<WrapperDiv>
			<ExternalDiv height={windowSize.height} width={windowSize.width}>
				<table>
					<tbody>
						<tr>
							<StyledTD>
								<InternalDiv>
									<ServerHeader>REDUX SERVERS JAILBREAK</ServerHeader>
								</InternalDiv>
							</StyledTD>
						</tr>
						<tr>
							<td>Currently playing on JB_NEW_SUMMER_V2</td>
						</tr>
						<tr>
							<StyledTD>
								<div class="windows8">
									<div class="wBall" id="wBall_1">
										<div class="wInnerBall"></div>
									</div>
									<div class="wBall" id="wBall_2">
										<div class="wInnerBall"></div>
									</div>
									<div class="wBall" id="wBall_3">
										<div class="wInnerBall"></div>
									</div>
									<div class="wBall" id="wBall_4">
										<div class="wInnerBall"></div>
									</div>
									<div class="wBall" id="wBall_5">
										<div class="wInnerBall"></div>
									</div>
								</div>
							</StyledTD>
						</tr>
					</tbody>
				</table>
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
