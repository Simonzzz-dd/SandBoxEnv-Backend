const express = require('express')
const {
  PostAtmTransferVRequest
} = require('../../../controllers/Request/SIMO_ATM_TransferVoucherController')
const requireAuth = require('../../../middleware/requireAuth')

const router = express.Router()
router.post("/generateATMVoucher",PostAtmTransferVRequest)

module.exports = router