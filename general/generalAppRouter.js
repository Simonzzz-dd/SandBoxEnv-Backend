const express = require('express')
const apiRequestCollections = require('./controller/getCollection/getAvailableResquests')
const getRequestCollectionDocuments = require("./controller/getDocuments/getRequestCollection")
const getApiResponseCollections = require('./controller/getCollection/ApiResponse')
const getApiResultCollections = require('./controller/getCollection/apiResult')

const router = express.Router()
// get collections 
router.post("/apiRequestCollections",apiRequestCollections)
router.post("/apiResponseCollection",getApiResponseCollections)
router.post("/apiResultCollection", getApiResultCollections)
// get documents
router.post("/apiRequestDouments", getRequestCollectionDocuments)

module.exports = router