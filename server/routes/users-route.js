// Import express
const express = require('express')

// Import books-controller
const usersRoutes = require('../controllers/users-controller.js')

// Create router
const router = express.Router()

// router.get('/all', booksRoutes.booksAll)
router.post('/login', usersRoutes.userLogin)

router.post('/register', usersRoutes.userCreate)

router.post('/control', usersRoutes.userControl)

// router.put('/delete', booksRoutes.booksDelete)

// router.put('/reset', booksRoutes.booksReset)

// Export router
module.exports = router
