import { createSlice } from '@reduxjs/toolkit'
import createBookWithId from '../../utils/createBookWithId'
import axios from 'axios'

const initialState = []

const booksSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		addBook: (state, action) => {
			state.push(action.payload)
		},
		deleteBook: (state, action) => {
			return state.filter(book => book.id !== action.payload)
		},
		toggleFavorite: (state, action) => {
			return state.map(book =>
				book.id === action.payload
					? { ...book, isFavorite: !book.isFavorite }
					: book
			)
			// --- One more way to do it ---
			// state.forEach(book => {
			// 	if (book.id === action.payload) {
			// 		book.isFavorite = !book.isFavorite
			// 	}
			// })
		},
	},
})

export const thunkFunction = async (dispatch, getState) => {
	try {
		const res = await axios.get('http://localhost:4000/random-book')
		if (res?.data?.title && res?.data?.author) {
			dispatch(addBook(createBookWithId(res.data, 'API')))
		}
	} catch (error) {
		console.log(`Error fetching random book: ${error}`)
	}
}

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const selectBooks = state => state.books

export default booksSlice.reducer
