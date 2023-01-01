// Import database
const knex = require('../db')

// Login user
exports.userLogin = async (req, res) => {
  await knex('users')
    .select("*")
    .where("email", req.body.email)
    .andWhere("password", req.body.password)
    .first()
    .then((data) => {
      // Send a success message in response
      res.json({ message: `${data.email} Kullanıcı girişi başarılı.`, id: data.id, companyname: data.companyname, username: data.username, email: data.email })
    })
    .catch(err => {
      // Send a error message in response
      res.status(404).json({ message: `Kullanıcı adı veya şifre hatalı!`, err: `Hata: ${err}` })
    })
}

// Create new user
exports.userCreate = async (req, res) => {
  await knex('users')
    .insert({
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
      res.status(404).json({ message: `Kullanıcı oluşturulamadı!`, err: `Hata: ${err}` })
    })
}

// User username and email control
exports.userControl = async (req, res) => {
  await knex('users')
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
      res.status(404).json({ message: `Kullanıcı kontrolünde hata oluştu!`, err: `Hata: ${err}` })
    })
}

// User Change Password
exports.userChangePassword = async (req, res) => {
  await knex('users')
    .where("email", req.body.email)
    .andWhere("password", req.body.password)
    .update("password", req.body.newPassword)
    .returning('*')
    .then((data) => {
      // Send a success message in response
      if(data != 0){
        res.json({ message: `${req.body.email} şifresi başarılı bir şekilde değişti.` })
      }else  res.json({ message: `Kullanılan parola şifresi yanlış!` })
    })
    .catch(err => {
      // Send a error message in response
      res.status(404).json({ message: `Bir hata oluştu. Şifre değiştirilemedi!`, err: `Hata: ${err}` })
    })
}

// User Change Information
exports.userChangeInformation = async (req, res) => {
  await knex('users')
    .where("id", req.body.id)
    .update({ companyname: req.body.companyname, username: req.body.username, email: req.body.email }, [ "id", "companyname", "username", "email" ])
    .then((data) => {
      // Send a success message in response
      if(data != 0){
        res.json({ message: `Kullanıcı bilgileri güncellendi.` })
      }else  res.json({ message: `Kullanıcı bilgileri güncellenemedi!` })
    })
    .catch(err => {
      // Send a error message in response
      res.status(404).json({ message: `Bir hata oluştu. Lütfen tekrar deneyiniz!`, err: `Hata: ${err}` })
    })
}


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
