import express from 'express';
import tourController from "../controllers/tourController.js";

const router = express.Router();

router.param('id' , tourController.checkId) ;

router.route('/')
      .get(tourController.getAllTour)
      .post(tourController.validateCreateReq , tourController.createTour);


router.route('/:id')
      .get(tourController.getTourById)
      .patch(tourController.updateTour)
      .delete(tourController.deleteTour);


export default router ;