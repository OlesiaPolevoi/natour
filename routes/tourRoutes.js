const express = require('express');
const tourController = require('./../controllers/tourController');

const tourRouter = express.Router();

tourRouter.param('id', tourController.checkId);
//checkBody middleware - checks if body contains name and price property. If not send back 400 (bad request)
//add to Post handler stack

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
