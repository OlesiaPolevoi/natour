const express = require('express');
// middleware morgan used for login
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLEWAREs that we aplly to all routes
//3rd party middleware
app.use(morgan('dev'));
//added middleware
app.use(express.json());

//to view static files in browser
app.use(express.static(`${__dirname}/public`));

//another middleware - custom, global
app.use((req, res, next) => {
  console.log('Hello from the middleware .. ');
  //use next !!! otherwise it won't run
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES
//middleware only applied to specified routes (to tourRouter)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
