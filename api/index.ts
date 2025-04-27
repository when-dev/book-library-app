import express, { Request, Response } from 'express'
import cors from 'cors'
import bookData from './data/books.json'

interface Book {
	title: string
	author: string
}

const app = express()
app.use(cors())

function getRandomBook(): Book {
	const randomIndex = Math.floor(Math.random() * bookData.length)
	const randomBook = bookData[randomIndex]
	return randomBook
}

app.get('/random-book', (req: Request, res: Response) => {
	res.json(getRandomBook())
})

app.get('/random-book-delayed', (req: Request, res: Response) => {
	setTimeout(() => {
		res.json(getRandomBook())
	}, 2000)
})

const port = process.env.PORT || 4000
app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
