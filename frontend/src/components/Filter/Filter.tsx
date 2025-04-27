import { ChangeEvent } from 'react'
import {
	setTitleFilter,
	setAuthorFilter,
	setOnlyFavoriteFilter,
	resetFilters,
	selectTitleFilter,
	selectAuthorFilter,
	selectOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import './Filter.css'

const Filter = () => {
	const dispatch = useAppDispatch()
	const titleFilter = useAppSelector(selectTitleFilter)
	const authorFilter = useAppSelector(selectAuthorFilter)
	const onlyFavoriteFilter = useAppSelector(selectOnlyFavoriteFilter)

	const handleTitleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setTitleFilter(e.target.value))
	}

	const handleAuthorFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setAuthorFilter(e.target.value))
	}

	const handleOnlyFavoriteFilterChange = () => {
		dispatch(setOnlyFavoriteFilter())
	}

	const handleResetFilters = () => {
		dispatch(resetFilters())
	}

	return (
		<div className='app-block filter'>
			<div className='filter-row'>
				<div className='filter-group'>
					<input
						type='text'
						value={titleFilter}
						placeholder='Filter by title...'
						onChange={handleTitleFilterChange}
					/>
				</div>
				<div className='filter-group'>
					<input
						type='text'
						value={authorFilter}
						placeholder='Filter by author...'
						onChange={handleAuthorFilterChange}
					/>
				</div>
				<div className='filter-group'>
					<label>
						<input
							type='checkbox'
							checked={onlyFavoriteFilter}
							onChange={handleOnlyFavoriteFilterChange}
						/>
						Only Favorite
					</label>
				</div>
				<button type='button' onClick={handleResetFilters}>
					Reset Filters
				</button>
			</div>
		</div>
	)
}

export default Filter
