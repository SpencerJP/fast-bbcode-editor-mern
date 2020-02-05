import { useEffect, useState } from "react"

export function useOnMountFetch(dispatch, actions) {
	const [isComplete, setIsComplete] = useState(false)
	useEffect(() => {
		async function asyncFetch() {
			if (Array.isArray(actions)) {
				for (let i = 0; i < actions.length; i++) {
					if (!isComplete) {
						await dispatch(actions[i]())
					}
				}
				setIsComplete(true)
			} else {
				if (!isComplete) {
					await dispatch(actions())
				}
				setIsComplete(true)
			}
		}
		try {
			asyncFetch()
		} catch (err) {
			console.error(err)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
