import express from 'express'
import * as user_controller from '../controllers/userController.js';

const router = express.Router();

router.get('/users/:userid', user_controller.user_detail);

router.delete('/users/:userid', user_controller.user_delete);

router.post('/sign-up', user_controller.user_create);

export default router;