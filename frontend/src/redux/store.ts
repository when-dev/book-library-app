import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/booksSlice'
import filterReducer from './slices/filterSlice'
import errorReducer from './slices/errorSlice'

export const store = configureStore({
	reducer: {
		books: booksReducer,
		filter: filterReducer,
		error: errorReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

