const express = require('express')
const apiRequestCollections = require('./controller/getCollection/getAvailableResquests')
const getApiResponseCollections = require('./controller/getCollection/ApiResponse')
const getApiResultCollections = require('./controller/getCollection/apiResult')

const getRequestCollectionDocuments = require("./controller/getDocuments/getRequestDocs")
const getResponseCollectionDocuments = require("./controller/getDocuments/getResponseDocs")
const getResultCollectionDocuments = require("./controller/getDocuments/getResultDocs")



const router = express.Router()
// get collections 
router.post("/apiRequestCollections",apiRequestCollections)
router.post("/apiResponseCollection",getApiResponseCollections)
router.post("/apiResultCollection", getApiResultCollections)
// get documents
router.post("/apiRequestDocuments", getRequestCollectionDocuments)
router.post("/apiResponseDocuments", getResponseCollectionDocuments)
router.post("/apiResultDocuments", getResultCollectionDocuments)
module.exports = router