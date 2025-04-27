import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Book, BookWithoutId } from '../../utils/createBookWithId'
import { setError } from './errorSlice'
import { RootState } from '../store'
import createBookWithId from '../../utils/createBookWithId'

interface BooksState {
	books: Book[]
	isLoadingViaAPI: boolean 
}

const initialState: BooksState = {
	books: [],
	isLoadingViaAPI: false,
}

export const fetchBook = createAsyncThunk<
		any,
		string,
		{ rejectValue: string }
	>(
	'books/fetchBook',
	async (url, thunkAPI) => {
		try {
			const res = await axios.get(url)
			return res.data
		} catch (error: any) {
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
		addBook: (state, action: PayloadAction<Book>) => {
			state.books.push(action.payload)
		},
		deleteBook: (state, action: PayloadAction<string>) => {
			return {
				...state,
				books: state.books.filter(book => book.id !== action.payload),
			}
		},
		toggleFavorite: (state, action: PayloadAction<string>) => {
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
					state.books.push(createBookWithId(action.payload as BookWithoutId, 'API'))
				}
			})
			.addCase(fetchBook.rejected, (state) => {
				state.isLoadingViaAPI = false
			})
	},
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const selectBooks = (state: RootState) => state.books.books
export const selectIsLoadingViaAPI = (state: RootState) => state.books.isLoadingViaAPI

export default booksSlice.reducer
