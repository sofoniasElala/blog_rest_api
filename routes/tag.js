import express from 'express';
import * as tag_controller from '../controllers/tagController.js';

const router = express.Router();

router.get('/', tag_controller.tag_list);
router.post('/', tag_controller.tag_create);
router.get('/:tagid', tag_controller.tag_posts_list);
router.put('/:tagid', tag_controller.tag_update);
router.delete('/:tagid', tag_controller.tag_delete);

export default router;