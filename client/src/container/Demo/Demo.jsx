import React from "react"
import CustomLoader from "../../components/common/CustomLoader/CustomLoader"
import { Segment, Grid } from "semantic-ui-react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import EditBoxDemo from "../../components/common/EditBox/EditBoxDemo"
import { useWindowSize } from "../../hooks/useWindowSize"
import { fetchDemo } from "../../redux/actions/messageActions"
import { useOnMountFetch } from "../../hooks/useOnMountFetch"

const StyledSegmentInner = styled(Segment)`
	&&& {
		padding: 40px;
		background-color: #222;
		border-radius: 13px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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

export default function Demo(props) {
	const { height } = useWindowSize()
	const rawBBCode = useSelector(state => state.messageReducer.demo)
	const isLoading = useSelector(state => state.messageReducer.loadingStatusMotd)
	const dispatch = useDispatch()

	useOnMountFetch(dispatch, fetchDemo)

	let rawBBCodeWithNewLines = rawBBCode
	if (rawBBCode) {
		rawBBCodeWithNewLines = rawBBCodeWithNewLines.replace(/\n/g, "[br][/br]")
	}

	return (
		<div className="App">
			<ExternalDiv>
				<Grid>
					<Grid.Row>
						<Grid.Column width={9}>
							<StyledSegmentInner>
								{!isLoading ? (
									<DataScroll heightString={`height: ${height - 113}px;`}>
										{props.parser.toReact(rawBBCodeWithNewLines)}
									</DataScroll>
								) : (
									<CustomLoader style={{ height: `${height - 100}px` }} />
								)}
							</StyledSegmentInner>
						</Grid.Column>
						<Grid.Column width={7}>
							<EditBoxDemo />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</ExternalDiv>
		</div>
	)
}
