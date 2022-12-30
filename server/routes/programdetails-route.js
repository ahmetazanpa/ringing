const express = require('express')

// Import books-controller
const programDetailsRoutes = require('../controllers/programdetails-controller.js')

// Create router
const router = express.Router()

router.post('/programdetails', programDetailsRoutes.insertProgramDetails)


// Export router
module.exports = router

