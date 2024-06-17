import express from 'express'
import * as user_controller from '../controllers/userController.js';
import * as post_controller from '../controllers/postController.js';
import * as comment_controller from '../controllers/commentController.js';
import * as tag_controller from '../controllers/tagController.js';

//TODO: protect all routes outside of home?

const router = express.Router();

router.get('/users', user_controller.user_list);
router.get('/users/:userid', user_controller.user_detail); //TODO: protect route
router.put('/users/:userid', user_controller.user_update);

router.delete('/users/:userid', user_controller.user_delete);

router.post('/sign-up', user_controller.user_create);

router.get('/', post_controller.post_list);

router.post('/posts', post_controller.post_create); //TODO: protect route

router.get('/posts/:postid', post_controller.post_detail);

router.put('/posts/:postid', post_controller.post_update);

router.delete('/posts/:postid', post_controller.post_delete); 


router.post('/posts/:postid', comment_controller.comment_create);
router.get('/posts/:postid/comments', comment_controller.comment_list);
router.get('/posts/:postid/comments/:commentid', comment_controller.comment_detail);
router.put('/posts/:postid/comments/:commentid', comment_controller.comment_update);
router.delete('/posts/:postid/comments/:commentid', comment_controller.comment_delete);

router.get('/tags', tag_controller.tag_list);
router.get('/tags/:tagid', tag_controller.tag_posts_list);
router.post('/tags', tag_controller.tag_create);
router.put('/tags/:tagid', tag_controller.tag_update);
router.delete('/tags/:tagid', tag_controller.tag_delete);

export default router;