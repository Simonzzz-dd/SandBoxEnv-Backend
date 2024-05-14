const SIMO_ATM_Voucher = require("../../models/Request/SIMO_ATM_TransferVoucherModel");
const XMLBody = require("../../XMLbodys/SIMO_ATM_TransferVoucher");
const SIMO_ATM_VoucherRes = require("../../models/Response/SIMO_ATM_TransferVoucherModel");
require("dotenv").config();
const axios = require("axios");
const xml2js = require("xml2js");
const uuidv4  = require('uuid') ;
const https = require('https');
const encrypt = require("../../functions/encryptPass")

// create new AtmTransferVRequest
const PostAtmTransferVRequest = async (req, res) => {
  const agent = new https.Agent({  
    rejectUnauthorized: false
  });

  let { password, msisdn, originator_id } = req.body;
  if (!originator_id) {
    originator_id = uuidv4.v4()
  }
  const mappingId = uuidv4.v4();
  let emptyFields = [];

  if (!originator_id) {
    emptyFields.push("originatorID");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (!msisdn) {
    emptyFields.push("msisdn");
  }
  if (emptyFields.length > 3) {
    return res.status(400).json({
      status: 400,
      error: "Please fill in all the fields",
      emptyFields,
    });
  }

  // encrypt pass 
  const encPass = await encrypt.encryptPass(password)
  password = encPass
  

  const body = XMLBody.SIMO_ATM_TransferVoucher(
    password,
    msisdn,
    originator_id
  );

  

  try {
    const voucherReq = await SIMO_ATM_Voucher.create({
      server_transaction_mapping_id: mappingId,
      api_req_body: body,
      originator_id: originator_id,
      user_id: 1,
      password,
      msisdn,
    });

    console.log("passed")

    const url = process.env.G2URL;
    
    

    // Set the headers for the request
    const headers = {
      "Content-Type": "text/xml",
    };
    
    // Send the XML request using Axios
    axios
      .post(url, body, { headers, httpsAgent: agent  })
      .then((xml_) => {
        // Save Response
        xml2js.parseString(xml_.data, async (err, result) => {
          if (err) {
            console.log(err)
            return res
              .status(400)
              .json({ error: "could'nt parse the response", status: 400 });
          } else {


          
            const conversationId =
              result["soapenv:Envelope"]["soapenv:Body"][0]["api:Response"][0][
                "res:Header"
              ][0]["res:ConversationID"][0];


            const originatorId =
              result["soapenv:Envelope"]["soapenv:Body"][0]["api:Response"][0][
                "res:Header"
              ][0]["res:OriginatorConversationID"][0];


            const responseStatus =
              result["soapenv:Envelope"]["soapenv:Body"][0]["api:Response"][0][
                "res:Body"
              ][0]["res:ServiceStatus"][0];


            const responseCode =
              result["soapenv:Envelope"]["soapenv:Body"][0]["api:Response"][0][
                "res:Body"
              ][0]["res:ResponseCode"][0];


            const responseDesc =
              result["soapenv:Envelope"]["soapenv:Body"][0]["api:Response"][0][
                "res:Body"
              ][0]["res:ResponseDesc"][0];


            

            try {
              await SIMO_ATM_VoucherRes.create({
                server_transaction_mapping_id: mappingId,
                api_res_body: xml_.data,
                originator_id: originatorId,
                response_code: responseCode,
                response_desc: responseDesc,
                conversation_id: conversationId,
                response_status: responseStatus,
                user_id: 1,
              });

              return res.status(200).json({
                status: 200,
                response: "request was succesfully executed😄",
                server_transaction_mapping_id: mappingId,
                G2Response: {
                  conversationID: conversationId,
                  originatorID: originatorId,
                  responseStatus: responseStatus,
                  responseCode: responseCode,
                  responseDescription: responseDesc,
                  
                },
              });
            } catch (err) { 
              return res
                .status(400)
                .json({ error: "could'nt save the response", status: 400 });
            }
          }
        });
      })
      .catch((error) => {
        return res.status(400).json({ error: error, status: 400 });
      });
  } catch (error) {
    return res.status(400).json({ error: error.message, status: 400 });
  }
};

module.exports = {
  PostAtmTransferVRequest,
};
