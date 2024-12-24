import express from "express";
import userControllers from "../controllers/userController.js";

const router = express.Router();

router.route('/')
      .get(userControllers.getAllUsers)
      .post(userControllers.createUser);


router.route('/:id')
      .get(userControllers.getUserById)
      .patch(userControllers.updateUser)
      .delete(userControllers.deleteUser);


export default router ;