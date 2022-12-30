// Import database
const knex = require('../db')

// Retrieve all books
// exports.userAll = async (req, res) => {
//   // Get all books from database
//   knex
//     .select('*') // select all records
//     .from('books') // from 'books' table
//     .then(userData => {
//       // Send books extracted from database in response
//       res.json(userData)
//     })
//     .catch(err => {
//       // Send a error message in response
//       res.json({ message: `There was an error retrieving books: ${err}` })
//     })
// }

// Login user
exports.userLogin = async (req, res) => {
  knex('users')
    .select("*")
    .where("email", req.body.email)
    .andWhere("password", req.body.password)
    .first()
    .then((data) => {
      // Send a success message in response
      if(data) res.json({ message: `${data.email} Kullanıcı girişi başarılı.`, companyname: data.companyname, username: data.username, email: data.email })
      else res.json({ message: "Kullanıcı adı veya şifre hatalı! "})
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `Kullanıcı ${req.body.email} giriş yapamadı! Hata: ${err}` })
    })
}


// Create new user
exports.userCreate = async (req, res) => {
  // Add new user to database
  knex('users')
    .insert({ // insert new record, a user
      'companyname': req.body.companyname,
      'username': req.body.username,
      'email': req.body.email,
      'password': req.body.password
    })
    .then((data) => {
      // Send a success message in response
      res.json({ message: `Kullanıcı oluşturuldı` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `Kullanıcı oluşturulamadı! User: ${err}` })
    })
}

// User username and email control
exports.userControl = async (req, res) => {
  // Add new user to database
  knex('users')
    .select("*")
    .where("email", req.body.email)
    .orWhere("username", req.body.username)
    .first()
    .then((data) => {
      // Send a success message in response
      if(req.body.email === data.email) return res.json({ message: `${req.body.email} mail hesabı zaten mevcut! ` })
      else return res.json({ message: `${req.body.username} kullanıcı adı zaten mevcut! ` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `Kullanıcı kontrolünde hata oluştu! User: ${err}` })
    })
}

// Remove specific book
// exports.booksDelete = async (req, res) => {
//   // Find specific book in the database and remove it
//   knex('books')
//     .where('id', req.body.id) // find correct record based on id
//     .del() // delete the record
//     .then(() => {
//       // Send a success message in response
//       res.json({ message: `Book ${req.body.id} deleted.` })
//     })
//     .catch(err => {
//       // Send a error message in response
//       res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
//     })
// }

// Remove all books on the list
// exports.booksReset = async (req, res) => {
//   // Remove all books from database
//   knex
//     .select('*') // select all records
//     .from('books') // from 'books' table
//     .truncate() // remove the selection
//     .then(() => {
//       // Send a success message in response
//       res.json({ message: 'Book list cleared.' })
//     })
//     .catch(err => {
//       // Send a error message in response
//       res.json({ message: `There was an error resetting book list: ${err}.` })
//     })
// }
