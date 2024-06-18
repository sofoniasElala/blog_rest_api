import express from 'express';
import * as tag_controller from '../controllers/tagController.js';
import passport from 'passport';
import { isAdmin } from '../lib/roleActionCheck.js';

const router = express.Router();

router.get('/', tag_controller.tag_list);
router.post('/', passport.authenticate('jwt', { session: false }), isAdmin, tag_controller.tag_create);
router.get('/:tagid', tag_controller.tag_posts_list);
router.put('/:tagid', passport.authenticate('jwt', { session: false }), isAdmin, tag_controller.tag_update);
router.delete('/:tagid', passport.authenticate('jwt', { session: false }), isAdmin, tag_controller.tag_delete);

export default router;