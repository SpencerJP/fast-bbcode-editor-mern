import React from "react"
// import Media from "react-media"
import { useWindowSize } from "../../hooks/useWindowSize"
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

// fakes a margin-top without adding a scroll bar
const WrapperDiv = styled.div`
	padding-top: ${EXTERNAL_MARGIN / 2}px;
`

export default function LoadingScreen() {
	const windowSize = useWindowSize()
	return (
		<WrapperDiv>
			<ExternalDiv height={windowSize.height} width={windowSize.width}>
				<table style={{ height: "90%" }}>
					<tbody>
						<tr>
							<td className="styled-td">
								<div className="logo-container">
									<img
										src="https://i.imgur.com/dj9zIsQ.png"
										alt="Redux Logo"
									></img>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className="windows8">
									<div className="wBall" id="wBall_1">
										<div className="wInnerBall"></div>
									</div>
									<div className="wBall" id="wBall_2">
										<div className="wInnerBall"></div>
									</div>
									<div className="wBall" id="wBall_3">
										<div className="wInnerBall"></div>
									</div>
									<div className="wBall" id="wBall_4">
										<div className="wInnerBall"></div>
									</div>
									<div className="wBall" id="wBall_5">
										<div className="wInnerBall"></div>
									</div>
								</div>
							</td>
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
