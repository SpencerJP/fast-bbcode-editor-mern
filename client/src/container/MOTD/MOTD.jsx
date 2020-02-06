import React from "react"
import CustomLoader from "../../components/common/CustomLoader/CustomLoader"
import { Segment, Grid } from "semantic-ui-react"
import DiscordAuth from "../../components/common/DiscordAuth/DiscordAuth"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import EditBox from "../../components/common/EditBox/EditBox"
import { useWindowSize } from "../../hooks/useWindowSize"
import { fetchMOTD } from "../../redux/actions/messageActions"
import { useOnMountFetch } from "../../hooks/useOnMountFetch"

const StyledSegmentInner = styled(Segment)`
	&&& {
		padding: 40px;
		background-color: #222;
		border-radius: 13px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
		// ${props => props.heightString}
	}
`

const DataScroll = styled.div`
	&&& {
		padding: 20px;
		background-color: #222;
		${props => props.heightString}
		overflow-y: scroll;
	}
`

const ExternalDiv = styled.div`
	background-color: #5c4949;
	padding: 20px;
	border-radius: 20px;
`

export default function MOTDScreen(props) {
	const { height } = useWindowSize()
	const rawBBCode = useSelector(state => state.messageReducer.motd)
	const isLoading = useSelector(state => state.messageReducer.loadingStatusMotd)
	const user = useSelector(state => state.discordReducer.discordUserObject)
	const dispatch = useDispatch()

	useOnMountFetch(dispatch, fetchMOTD)

	let rawBBCodeWithNewLines = rawBBCode
	if (rawBBCode) {
		rawBBCodeWithNewLines = rawBBCodeWithNewLines.replace(/\n/g, "[br][/br]")
	}

	if (
		user &&
		(user.id === "290097917388128258" || user.id === "150623388036104192") // todo, remove hardcode, however for the moment it is secure anyways
	) {
		return (
			<div className="App">
				<ExternalDiv>
					<Grid>
						<Grid.Row>
							<Grid.Column width={10}>
								<StyledSegmentInner user={user}>
									{!isLoading ? (
										<DataScroll heightString={`height: ${height - 113}px;`}>
											{props.parser.toReact(rawBBCodeWithNewLines)}
										</DataScroll>
									) : (
											<CustomLoader style={{ height: `${height - 100}px` }} />
										)}
								</StyledSegmentInner>
							</Grid.Column>
							<Grid.Column width={6}>
								<EditBox />
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<DiscordAuth />
						</Grid.Row>
					</Grid>
				</ExternalDiv>
			</div>
		)
	} else {
		return (
			<div className="App">
				<ExternalDiv>
					<StyledSegmentInner user={user}>
						{!isLoading ? (
							props.parser.toReact(rawBBCodeWithNewLines)
						) : (
								<CustomLoader style={{ height: "1000px" }} />
							)}
					</StyledSegmentInner>
					<DiscordAuth />
				</ExternalDiv>
			</div>
		)
	}
}
