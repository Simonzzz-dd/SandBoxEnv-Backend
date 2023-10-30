const express = require('express')
const PostAtmTransferVRequest = require('./SIMO/SIMO_ATM_TransferVoucher')


const router = express.Router()
router.use("",PostAtmTransferVRequest)

module.exports = router