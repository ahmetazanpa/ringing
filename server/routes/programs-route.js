const express = require('express')

// Import books-controller
const programRoutes = require('../controllers/programs-controller.js')

// Create router
const router = express.Router()

router.get('/allprogram', programRoutes.getAllPrograms)
router.get('/todayprogram', programRoutes.getTodayPrograms)
router.post('/program', programRoutes.insertProgram)
router.delete('/program/:id', programRoutes.deleteProgram)


// Export router
module.exports = router

