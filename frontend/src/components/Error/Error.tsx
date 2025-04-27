import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { ToastContainer, toast } from 'react-toastify'
import { selectErrorMessage, clearError } from '../../redux/slices/errorSlice'
import 'react-toastify/dist/ReactToastify.css'

const Error = () => {
	const errorMessage = useAppSelector(selectErrorMessage)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (errorMessage) {
			toast.info(errorMessage)
			dispatch(clearError())
		}
	}, [errorMessage, dispatch])

	return <ToastContainer position='top-right' autoClose={2000} />
}

export default Error