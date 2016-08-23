'use strict';

import {Router} from 'express';
import * as controller from './user.controller';

var router = new Router();

router.get('/', controller.index);
router.delete('/:id', controller.destroy);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);

module.exports = router;
