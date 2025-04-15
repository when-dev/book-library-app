import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import createBookWithId from '../../utils/createBookWithId'
import { setError } from './errorSlice'

const initialState = {
	books: [],
	isLoadingViaAPI: false,
}

export const fetchBook = createAsyncThunk(
	'books/fetchBook',
	async (url, thunkAPI) => {
		try {
			const res = await axios.get(url)
			return res.data
		} catch (error) {
			thunkAPI.dispatch(setError(error.message))
			// OPTION 1
			return thunkAPI.rejectWithValue(error.message)	
			// OPTION 2
			// throw error
		}
	}
)

const booksSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		addBook: (state, action) => {
			state.books.push(action.payload)
		},
		deleteBook: (state, action) => {
			return {
				...state,
				books: state.books.filter(book => book.id !== action.payload),
			}
		},
		toggleFavorite: (state, action) => {
			// Change map on forEach
			state.books.forEach(book => {
				if (book.id === action.payload) {
					book.isFavorite = !book.isFavorite
				}
			})
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchBook.pending, state => {
				state.isLoadingViaAPI = true
			})
			.addCase(fetchBook.fulfilled, (state, action) => {
				state.isLoadingViaAPI = false
				if (action.payload?.title && action.payload?.author) {
					state.books.push(createBookWithId(action.payload, 'API'))
				}
			})
			.addCase(fetchBook.rejected, (state) => {
				state.isLoadingViaAPI = false
			})
	},
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const selectBooks = state => state.books.books
export const selectIsLoadingViaAPI = state => state.books.isLoadingViaAPI

export default booksSlice.reducer
