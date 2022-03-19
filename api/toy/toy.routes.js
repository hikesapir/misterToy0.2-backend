const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { getToys, getToyById, addToy, updateToy, removeToy, } = require('./toy.controller')
const router = express.Router()

router.get('/', log, getToys)
router.get('/:id', getToyById)
router.post('/', addToy)
router.put('/:id', updateToy)
router.delete('/:id', removeToy)


module.exports = router