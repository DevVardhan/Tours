import express from "express";
import userControllers from "../controllers/userController.js";
import authControllers from "../controllers/authController.js";

const router = express.Router();

router.route('/signup')
      .post(authControllers.userSignup);

router.route('/signin')
      .post(authControllers.userSignin);

router.route('/')
      .get(userControllers.getAllUsers)
      .post(userControllers.createUser);


router.route('/:id')
      .get(userControllers.getUserById)
      .patch(userControllers.updateUser)
      .delete(userControllers.deleteUser);


export default router ;