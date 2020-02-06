export function getExpectedStateBuilder(strReducerName) {
	return function getExpectedState(state, key, value) {
		return {
			...state,
			[strReducerName]: {
				...state[strReducerName],
				[key]: value,
			},
		}
	}
}
