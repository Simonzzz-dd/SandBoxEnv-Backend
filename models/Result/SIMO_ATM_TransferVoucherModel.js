const mongoose = require("mongoose");
const dbConnections = require("../../dataBaseConnections");

const Schema = mongoose.Schema;

const SIMO_ATM_TransferVoucherScheema = new Schema(
  {
    api_res_body: {
      type: String,
      required: true,
    },
    conversation_id: {
      type: String,
    },
    originator_id: {
      type: String,
    },
    result_code: {
      type: String,
    },
    result_desc: {
      type: String,
    },
    result_type: {
      type: String,
    },

    transaction_result: {
        type: String
    }
  },
  { timestamps: true }
);

module.exports = dbConnections.apiResultDB.model(
  "SIMO_ATM_TransferVoucher",
  SIMO_ATM_TransferVoucherScheema
);
