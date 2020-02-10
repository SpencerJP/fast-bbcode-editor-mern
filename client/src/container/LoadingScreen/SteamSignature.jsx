import React from "react"

export default function SteamSignature(props) {
	return (
		<img
			src={`https://steamsignature.com/status/default/${props.steamid}.png`}
			alt=""
		/>
	)
}
