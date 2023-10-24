const fs = require('fs');
const express = require('express');
// middleware morgan used for login
const morgan = require('morgan');

const app = express();

//MIDDLEWARE
//3rd party middleware
app.use(morgan('dev'));

//added middleware
app.use(express.json());

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

// app.get('/', (request, response) => {
//   response
//     .status(200)
//     .json({ message: 'Hello from the server!!!', app: 'Natours' });
// });

// app.post('/', (request, response) => {
//   response.send('You can post to this endpoint');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// ROUTE HANDLERS
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};
const getTour = (req, res) => {
  // console.log(req.params);
  const tourId = parseInt(req.params.id);

  // turn id string into an integer/number
  const tour = tours.find((tour) => tour.id === tourId);

  // if (tourId > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid tour id :(',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};
const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  //allows to merge two objects without mutating the original
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
      if (err) throw err;
    }
  );

  // res.send('Done with post req.');
};
const updateTour = (req, res) => {
  //some logic that  updates existing tour

  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid tour id oops',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
};
const deleteTour = (req, res) => {
  //some logic that deletes existing tour

  if (req.params.id > tours.length) {
    return res.status(204).json({
      status: 'fail',
      message: 'Invalid tour id oops',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route Not Yet Implemented',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route Not Yet Implemented',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route Not Yet Implemented',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route Not Yet Implemented',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route Not Yet Implemented',
  });
};

//GET all tours
// app.get('/api/v1/tours', getAllTours);

//GET a single tour by id
// app.get('/api/v1/tours/:id', getTour);

// Create (POST) a new tour
// app.post('/api/v1/tours', createTour);

//PATCH update a tour
// app.patch('/api/v1/tours/:id', updateTour);

//DELETE
// app.delete('/api/v1/tours/:id', deleteTour);

//ROUTES
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//STRT SERVER
const port = 3000;

app.listen(port, () => {
  console.log('App running ...');
});
