import express from 'express';
import * as user_controller from '../controllers/userController.js';
import passport from 'passport';
import { isTheSameUserOrAdminOnParams } from '../lib/roleActionCheck.js';

const router = express.Router();

router.get('/', user_controller.user_list);
router.get('/:userid', user_controller.user_detail);
router.put('/:userid', passport.authenticate('jwt', { session: false }), isTheSameUserOrAdminOnParams, user_controller.user_update);
router.delete('/:userid', passport.authenticate('jwt', { session: false }), isTheSameUserOrAdminOnParams, user_controller.user_delete);

export default router;