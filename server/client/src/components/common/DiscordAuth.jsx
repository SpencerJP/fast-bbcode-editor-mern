import React from "react"
import { Button, Image } from "semantic-ui-react"
import { useSelector, useDispatch } from "react-redux"
import { useCookies } from "react-cookies"
import styled from "styled-components"
import { getDiscordUserObject, deleteDiscordUserObject } from "../../redux/actions/discordApiActions"

const Avatar = styled(Image)`
	border-radius: 50%;
	height: 25%;
	width: 25%;
`

const LoginLogoutButton = styled(Button)`
	color: #7289da;
`

export default function DiscordAuth() {
	const user = useSelector(state => state.discordReducer.discordUserObject)
	const dispatch = useDispatch()
	const [cookies, _setCookie, removeCookie] = useCookies(["discord_token"])

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	if (user) {
		return (
			<>
				<Avatar
					className="discord-avatar"
					src={`http://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
				/>

				<LoginLogoutButton
					color="#7289DA"
					onClick={() => {
						removeCookie("discord_token")
						dispatch(deleteDiscordUserObject())
					}}
				>
					Logout
				</LoginLogoutButton>
			</>
		)
	} else {
		return (
			<LoginLogoutButton color="#7289DA" href={window.REACT_APP_URL + "/api/discord/login/"}>
				Login
			</LoginLogoutButton>
		)
	}
}
