import express from 'express'
import * as user_controller from '../controllers/userController.js';
import * as post_controller from '../controllers/postController.js';

//TODO: protect all routes outside of home?

const router = express.Router();

router.get('/users/:userid', user_controller.user_detail); //TODO: protect route
router.put('/users/:userid', user_controller.user_update);

router.delete('/users/:userid', user_controller.user_delete);

router.post('/sign-up', user_controller.user_create);

router.get('/', post_controller.post_list);

router.post('/posts', post_controller.post_create); //TODO: protect route

router.get('/posts/:postid', post_controller.post_detail);

router.put('/posts/:postid', post_controller.post_update);

router.delete('/posts/:postid', post_controller.post_delete); 

export default router;