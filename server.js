const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

MongoClient.connect('mongodb+srv://ruhi:ruhi2620@cluster0.prec4.mongodb.net/crud-test?retryWrites=true&w=majority', {
	useUnifiedTopology: true
}).then(client => {
	const db = client.db('crud-test')
	const notesCollection = db.collection('notes')

	app.set('view engine', 'ejs')

	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.use(express.static('public'))

	app.get('/', (req, res) => {
		db.collection('notes').find().toArray()
			.then(notes => {
				res.render('index.ejs', { notes: notes })
			})
			.catch(error => console.error(error))
	})

	app.post('/notes', (req, res) => {
		notesCollection.insertOne(req.body)
			.then(result => {
				res.redirect('/')
			})
			.catch(error => console.error(error))
	})

	app.put('/notes', (req, res) => {
		notesCollection.findOneAndUpdate(
			{ name: 'some' },
			{
				$set: {
					name: req.body.name,
					note: req.body.note
				}
			},
			// {
			// 	upsert: true
			// }
		)
			.then(result => res.json('Success'))
			.catch(error => console.error(error))
	})

	app.delete('/notes', (req, res) => {
		notesCollection.deleteOne(
			{ name: req.body.name }
		)
			.then(result => {
				if (result.deletedCount === 0) {
					return res.json('No note to delete')
				}
				res.json('Deleted another note')
			})
			.catch(error => console.error(error))
	})

	app.listen(3000, function () {
		console.log('listening on 3000')
	})
})
	.catch(console.error)