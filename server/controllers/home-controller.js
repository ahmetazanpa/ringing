// Import database
const knex = require('../db')

// Retrieve all books
exports.userAll = async (req, res) => {
  // Get all books from database
  await knex
    .select('*') // select all records
    .from('users') // from 'books' table
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.status(404).json({ message: `There was an error retrieving books: ${err}` })
    })
}
