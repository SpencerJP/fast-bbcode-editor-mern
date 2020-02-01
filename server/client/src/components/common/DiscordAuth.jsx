import React from "react"
import { Button, Image, Grid } from "semantic-ui-react"
import { useSelector, useDispatch } from "react-redux"
import { useCookies } from "react-cookie"
import styled from "styled-components"
import { getDiscordUserObject, deleteDiscordUserObject } from "../../redux/actions/discordApiActions"

const Avatar = styled(Image)`
	&&&&&& {
		border-radius: 50%;
		max-width: 40px;
		height: auto;
	}
`

const LoginLogoutButton = styled(Button)`
	&&& {
		background-color: #7289da;
		color: #fff;
		min-height: 40px;
	}
`

export default function DiscordAuth() {
	const user = useSelector(state => state.discordReducer.discordUserObject)
	const dispatch = useDispatch()
	const [cookies, , removeCookie] = useCookies(["discord_token"])

	React.useEffect(() => {
		async function getDiscordUser() {
			let dToken = cookies.discord_token
			if (dToken) {
				let response = await fetch("https://discordapp.com/api/users/@me", {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${dToken}`,
					},
				})
				let data = await response.json()
				dispatch(getDiscordUserObject(data))
			}
		}
		try {
			getDiscordUser()
		} catch (err) {
			console.error(err)
		}
	}, [cookies.discord_token, dispatch])
	if (user) {
		return (
			<Grid>
				<Grid.Row>
					<Grid.Column width={1}>
						<LoginLogoutButton
							color="blue"
							onClick={() => {
								removeCookie("discord_token")
								dispatch(deleteDiscordUserObject())
							}}
						>
							Logout
						</LoginLogoutButton>
					</Grid.Column>
					<Grid.Column width={1} style={{ marginLeft: "30px" }}>
						<Avatar
							className="discord-avatar"
							id="avatar"
							src={`http://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	} else {
		return (
			<LoginLogoutButton color="blue" href={window.REACT_APP_URL + "/api/discord/login/"}>
				Login
			</LoginLogoutButton>
		)
	}
}
