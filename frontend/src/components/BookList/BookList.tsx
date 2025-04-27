import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import {
	deleteBook,
	selectBooks,
	toggleFavorite,
} from '../../redux/slices/booksSlice'
import {
	selectAuthorFilter,
	selectOnlyFavoriteFilter,
	selectTitleFilter,
} from '../../redux/slices/filterSlice'
import { Book } from '../../utils/createBookWithId'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './BookList.css'

const BookList = () => {
	const books = useAppSelector(selectBooks)
	const titleFilter = useAppSelector(selectTitleFilter)
	const authorFilter = useAppSelector(selectAuthorFilter)
	const onlyFavoriteFilter = useAppSelector(selectOnlyFavoriteFilter)
	const dispatch = useAppDispatch()

	const handleDeleteBook = (id: string) => {
		dispatch(deleteBook(id))
	}

	const handleToggleFavorite = (id: string) => {
		dispatch(toggleFavorite(id))
	}

	const filteredBooks = books.filter((book: Book) => {
		const matchesTitle = book.title
			.toLowerCase()
			.includes(titleFilter.toLowerCase())
		const matchesAuthor = book.author
			.toLowerCase()
			.includes(authorFilter.toLowerCase())
		const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true
		return matchesTitle && matchesAuthor && matchesFavorite
	})

	const highlightMatch = (text: string, filter: string) => {
		if (!filter) return text

		const regex = new RegExp(`(${filter})`, 'gi')

		return text.split(regex).map((substring, idx) => {
			if (substring.toLowerCase() === filter.toLowerCase()) {
				return (
					<span key={idx} className='highlight'>
						{substring}
					</span>
				)
			}
			return substring
		})
	}

	return (
		<div className='app-block book-list'>
			<h2>Book List</h2>
			{books.length === 0 ? (
				<p>No books available</p>
			) : (
				<ul>
					{filteredBooks.map((book, i) => (
						<li key={book.id}>
							<div className='book-info'>
								{++i}. {highlightMatch(book.title, titleFilter)} by{' '}
								<strong>{highlightMatch(book.author, authorFilter)}</strong> (
								{book.source})
							</div>
							<div className='book-actions'>
								<span onClick={() => handleToggleFavorite(book.id)}>
									{book.isFavorite ? (
										<BsBookmarkStarFill className='star-icon' />
									) : (
										<BsBookmarkStar className='star-icon' />
									)}
								</span>
								<button onClick={() => handleDeleteBook(book.id)}>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default BookList
