import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface FilterState {
	title: string
	author: string
	onlyFavorite: boolean
}

const initialState: FilterState = {
	title: '',
	author: '',
	onlyFavorite: false,
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setTitleFilter: (state, action: PayloadAction<string>) => {
			// You can mutate state thanks to Immer Library
			state.title = action.payload

			// // You can also return new state as usually
			// return { ...state, title: action.payload }
		},
		setAuthorFilter: (state, action: PayloadAction<string>) => {
			state.author = action.payload
		},
		setOnlyFavoriteFilter: state => {
			state.onlyFavorite = !state.onlyFavorite
		},
		resetFilters: () => {
			return initialState
		},
	},
})

export const {
	setTitleFilter,
	resetFilters,
	setAuthorFilter,
	setOnlyFavoriteFilter,
} = filterSlice.actions

export const selectTitleFilter = (state: RootState) => state.filter.title
export const selectAuthorFilter = (state: RootState) => state.filter.author
export const selectOnlyFavoriteFilter = (state: RootState) => state.filter.onlyFavorite

export default filterSlice.reducer
