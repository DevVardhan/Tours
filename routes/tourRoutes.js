import express from 'express';
import tourController from "../controllers/tourController.js";

const router = express.Router();

// Middlewear to validate id parameter in request 
// router.param('id' , tourController.checkId) ;


router.route('/')
      .get(tourController.getAllTour)
      .post(tourController.createTour);


router.route('/:id')
      .get(tourController.getTourById)
      .patch(tourController.updateTour)
      .delete(tourController.deleteTour);


export default router ;