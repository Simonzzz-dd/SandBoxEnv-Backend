const xml2js = require("xml2js");
const VoucherReqModel = require("../../models/Result/SIMO_ATM_TransferVoucherModel");

// create new workout
const PostAtmTransferVRequest = async (req, res) => {
  const xmlRequest = req.body;
  console.log(xmlRequest.toString());
  xml2js.parseString(xmlRequest, async (err, data) => {
    if (err) {
      res
        .status(400)
        .json({ error: "could'nt parse the response", status: 400 });
    } else {
      const conversationId =
        data["soapenv:Envelope"]["soapenv:Body"][0]["api:Result"][0][
          "res:Header"
        ][0]["res:ConversationID"][0];
      const originatorId =
        data["soapenv:Envelope"]["soapenv:Body"][0]["api:Result"][0][
          "res:Header"
        ][0]["res:OriginatorConversationID"][0];
      const resultCode =
        data["soapenv:Envelope"]["soapenv:Body"][0]["api:Result"][0][
          "res:Body"
        ][0]["res:ResultCode"][0];
      const resultType =
        data["soapenv:Envelope"]["soapenv:Body"][0]["api:Result"][0][
          "res:Body"
        ][0]["res:ResultType"][0];
      const resultDesc =
        data["soapenv:Envelope"]["soapenv:Body"][0]["api:Result"][0][
          "res:Body"
        ][0]["res:ResultDesc"][0];
      const transactionResult =
        JSON.stringify(data["soapenv:Envelope"]["soapenv:Body"][0]["api:Result"][0][
          "res:Body"
        ][0]["res:TransactionResult"])
      try {
        await VoucherReqModel.create({
          api_res_body: xmlRequest,
          originator_id: originatorId,
          conversation_id: conversationId,
          result_desc: resultDesc,
          result_type: resultType,
          transaction_result: transactionResult,
        });
      } catch {
        return res
          .status(400)
          .json({ error: "could'nt save the response", status: 400 });
      }

      return res.status(200).json({
        response: {
    
          originator_id: originatorId,
          conversation_id: conversationId,
          result_desc: resultDesc,
          result_type: resultType,
          transaction_result: transactionResult,
        },
      });
    }
  });
};

module.exports = {
  PostAtmTransferVRequest,
};
