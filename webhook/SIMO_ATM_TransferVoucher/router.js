const express = require('express')
const {
  PostAtmTransferVRequest
} = require('./controller')
const requireAuth = require('../../middleware/requireAuth')

const router = express.Router()
router.post("/generateATMVoucher",PostAtmTransferVRequest)

module.exports = router