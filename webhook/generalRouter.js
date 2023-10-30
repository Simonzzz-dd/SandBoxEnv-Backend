const express = require('express')
const PostAtmTransferVRequest = require('./SIMO_ATM_TransferVoucher/router')


const router = express.Router()
router.use("",PostAtmTransferVRequest)

module.exports = router