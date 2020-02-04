import React from "react"
import { Button, Image, Grid } from "semantic-ui-react"
import { useSelector, useDispatch } from "react-redux"
import { useCookies } from "react-cookie"
import styled from "styled-components"
import {
	getDiscordUserObject,
	deleteDiscordUserObject,
} from "../../redux/actions/discordApiActions"

const Avatar = styled(Image)`
	&&&&&& {
		border-radius: 50%;
		max-width: 40px;
		height: auto;
		// margin-left: 6em;
	}
`

const LoginLogoutButton = styled(Button)`
	&&& {
		background-color: #7289da;
		color: #fff;
		min-height: 40px;
		min-width: 160px;
	}
`

const DiscordLogo = styled.img`
	max-width: 35px;
	height: auto;
	float: left;
`

const TextAlignment = styled.span`
	font-size: 16px;
	line-height: 2em;
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
			<>
				<Grid.Column style={{ minWidth: "160px" }}>
					<LoginLogoutButton
						color="blue"
						onClick={() => {
							removeCookie("discord_token")
							dispatch(deleteDiscordUserObject())
						}}
					>
						<DiscordLogo
							src="https://discordapp.com/assets/1c8a54f25d101bdc607cec7228247a9a.svg"
							alt="discord icon"
						/>
						<TextAlignment>Logout</TextAlignment>
					</LoginLogoutButton>
				</Grid.Column>
				<Grid.Column width={2} style={{ textAlign: "center" }}>
					<Avatar
						className="discord-avatar"
						id="avatar"
						src={`http://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
					/>
				</Grid.Column>
			</>
		)
	} else {
		return (
			<LoginLogoutButton
				color="blue"
				href={window.REACT_APP_URL + "/api/discord/login/"}
			>
				<DiscordLogo
					src="https://discordapp.com/assets/1c8a54f25d101bdc607cec7228247a9a.svg"
					alt="discord icon"
				/>
				<TextAlignment>Login</TextAlignment>
			</LoginLogoutButton>
		)
	}
}
