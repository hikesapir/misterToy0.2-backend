const express = require('express')
const { getUser, getUsers, deleteUser, updateUser } = require('./user.controller')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', requireAuth, requireAdmin, deleteUser)

module.exports = router