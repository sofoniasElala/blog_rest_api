import express from 'express';
import * as user_controller from '../controllers/userController.js';

const router = express.Router();

router.get('/', user_controller.user_list);
router.get('/:userid', user_controller.user_detail);
router.put('/:userid', user_controller.user_update);
router.delete('/:userid', user_controller.user_delete);

export default router;