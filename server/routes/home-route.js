const express = require('express')

// Import books-controller
const homeRoutes = require('../controllers/home-controller.js')

// Create router
const router = express.Router()

router.get('/home', homeRoutes.userAll)


// Export router
module.exports = router

