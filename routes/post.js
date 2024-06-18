import express from 'express';
import * as post_controller from '../controllers/postController.js';
import * as comment_controller from '../controllers/commentController.js';
import passport from 'passport';
import { isAdmin, isTheSameUser, isTheSameUserOrAdmin } from '../lib/roleActionCheck.js';

const router = express.Router();

router.post('/:postid/comments', passport.authenticate('jwt', { session: false }), isTheSameUser, comment_controller.comment_create);
router.get('/:postid/comments', comment_controller.comment_list);
router.get('/:postid/comments/:commentid', comment_controller.comment_detail);
router.put('/:postid/comments/:commentid', passport.authenticate('jwt', { session: false }), isTheSameUser, comment_controller.comment_update);
router.delete('/:postid/comments/:commentid', passport.authenticate('jwt', { session: false }), isTheSameUserOrAdmin, comment_controller.comment_delete);

router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, post_controller.post_create);
router.get('/:postid', post_controller.post_detail);
router.put('/:postid', passport.authenticate('jwt', { session: false }), isAdmin, post_controller.post_update);
router.delete('/:postid', passport.authenticate('jwt', { session: false }), isAdmin, post_controller.post_delete); 

export default router;