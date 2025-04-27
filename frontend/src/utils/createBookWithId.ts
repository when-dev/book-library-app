import { v4 as uuidv4 } from 'uuid'

export interface Book {
	id: string
	title: string
	author: string
	source: 'manual' | 'random' | 'API'
	isFavorite: boolean
}

export interface BookWithId {
	title: string
	author: string
}

const createBookWithId = (book: BookWithId, source: Book['source']): Book => {
	return {
		...book,
		source,
		isFavorite: false,
		id: uuidv4(),
	}
}

export default createBookWithId