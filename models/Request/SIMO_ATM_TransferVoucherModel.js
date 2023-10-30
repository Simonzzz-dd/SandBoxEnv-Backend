const mongoose = require("mongoose");
const dbConnections = require("../../dataBaseConnections");

const Schema = mongoose.Schema;

const SIMO_ATM_TransferVoucherScheema = new Schema(
  {
    server_transaction_mapping_id: {
      type: String,
    },
    api_req_body: {
      type: String,
      required: true,
    },
    msisdn: {
      type: String,
      required: true,
    },
    originator_id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

module.exports = dbConnections.apiRequestDB.model(
  "SIMO_ATM_TransferVoucher",
  SIMO_ATM_TransferVoucherScheema
);
