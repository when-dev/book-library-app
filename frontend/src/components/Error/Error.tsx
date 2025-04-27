import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { selectErrorMessage, clearError } from '../../redux/slices/errorSlice'
import { RootState, AppDispatch } from '../../redux/store'
import 'react-toastify/dist/ReactToastify.css'

const Error = () => {
	const errorMessage = useSelector((state: RootState) => selectErrorMessage(state))
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (errorMessage) {
			toast.info(errorMessage)
			dispatch(clearError())
		}
	}, [errorMessage, dispatch])

	return <ToastContainer position='top-right' autoClose={2000} />
}

export default Error