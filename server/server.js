// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')

// Import routes
const usersRouter = require('./routes/users-route')
const homeRouter = require('./routes/home-route')
const programsRouter = require('./routes/programs-route')
const programDetailsRouter = require('./routes/programdetails-route')

// Create express app
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors({ origin: true }));
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../build')));


// Implement books route
app.use('/auth', usersRouter);
app.use('/home', homeRouter);
app.use('/programs', programsRouter);
app.use('/programdetails', programDetailsRouter);


// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

module.exports = app;
