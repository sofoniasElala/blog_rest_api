import express from 'express';
import * as post_controller from '../controllers/postController.js';
import * as comment_controller from '../controllers/commentController.js';

const router = express.Router();

router.post('/:postid/comments', comment_controller.comment_create);
router.get('/:postid/comments', comment_controller.comment_list);
router.get('/:postid/comments/:commentid', comment_controller.comment_detail);
router.put('/:postid/comments/:commentid', comment_controller.comment_update);
router.delete('/:postid/comments/:commentid', comment_controller.comment_delete);

router.post('/', post_controller.post_create);
router.get('/:postid', post_controller.post_detail);
router.put('/:postid', post_controller.post_update);
router.delete('/:postid', post_controller.post_delete); 

export default router;