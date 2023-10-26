const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//create middleware to check id. val is the value of parameter
exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);

  // if (req.params.id * 1 > tours.length) {
  if (val * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid tour id oops',
    });
  }
  next();
};
//middleware
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Name and price are required',
    });
  }
  next();
};

// ROUTE HANDLERS aka Controllers
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  // console.log(req.params);
  const tourId = parseInt(req.params.id);

  // turn id string into an integer/number
  const tour = tours.find((tour) => tour.id === tourId);

  // // if (tourId > tours.length) {
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid tour id :(',
  //   });
  // }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  //some logic that  updates existing tour

  // if (req.params.id > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid tour id oops',
  //   });
  // }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  //some logic that deletes existing tour

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
