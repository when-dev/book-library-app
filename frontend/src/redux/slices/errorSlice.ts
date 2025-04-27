import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: string = ''

const errorSlice = createSlice({
	name: 'error',
	initialState,
	reducers: {
		setError: (_, action: PayloadAction<string>) => {
			return action.payload
		},
		clearError: () => {
			return initialState
		},
	},
})

export const { setError, clearError } = errorSlice.actions

export const selectErrorMessage = (state: RootState) => state.error

export default errorSlice.reducer
