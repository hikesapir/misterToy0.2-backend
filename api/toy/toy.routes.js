const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getToys, getToyById, addToy, updateToy, removeToy, } = require('./toy.controller')
const router = express.Router()

router.get('/', log, getToys)
router.get('/:id', getToyById)
router.post('/', requireAuth, requireAdmin, addToy)
router.put('/:id', requireAuth, requireAdmin, updateToy)
router.delete('/:id', requireAuth, requireAdmin, removeToy)


module.exports = router