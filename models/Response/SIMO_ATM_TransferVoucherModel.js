const mongoose = require("mongoose");
const dbConnections = require("../../dataBaseConnections");

const Schema = mongoose.Schema;

const SIMO_ATM_TransferVoucherScheema = new Schema(
  {
    server_transaction_mapping_id: {
      type: String,
    },
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
    response_code: {
      type: String,
    },
    response_desc: {
      type: String,
    },
    response_status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = dbConnections.apiResponseDB.model(
  "SIMO_ATM_TransferVoucher",
  SIMO_ATM_TransferVoucherScheema
);
