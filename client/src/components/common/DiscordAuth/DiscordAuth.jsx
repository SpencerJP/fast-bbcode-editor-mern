import React from "react"
import { Button, Image, Grid } from "semantic-ui-react"
import { useSelector, useDispatch } from "react-redux"
import { useCookies } from "react-cookie"
import styled from "styled-components"
import {
	getDiscordUserObject,
	deleteDiscordUserObject,
} from "../../../redux/actions/discordApiActions"

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
async function getDiscordUser(cookies, dispatch) {
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

export default function DiscordAuth() {
	const user = useSelector(state => state.discordReducer.discordUserObject)
	const dispatch = useDispatch()
	const [cookies, , removeCookie] = useCookies(["discord_token"])

	React.useEffect(() => {
		try {
			getDiscordUser(cookies, dispatch)
		} catch (err) {
			console.error(err)
		}
	}, [cookies, cookies.discord_token, dispatch])
	return (
		<>
			<Grid.Column width={3}>
				<LoginLogoutButton
					color="blue"
					href={!user && window.REACT_APP_URL + "/api/discord/login/"}
					onClick={user && function () {
						if (user) {
							removeCookie("discord_token")
							dispatch(deleteDiscordUserObject())

						}
					}}
				>
					<DiscordLogo
						src="https://discordapp.com/assets/1c8a54f25d101bdc607cec7228247a9a.svg"
						alt="discord icon"
					/>
					<TextAlignment>{user ? "Logout" : "Login"}</TextAlignment>
				</LoginLogoutButton>
			</Grid.Column>
			{user && (
				<Grid.Column width={2} style={{ textAlign: "center" }}>
					<Avatar
						className="discord-avatar"
						id="avatar"
						src={`http://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
					/>
				</Grid.Column>
			)}
		</>
	)
}
