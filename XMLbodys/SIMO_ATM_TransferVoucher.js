const SIMO_ATM_TransferVoucher = (
  password,
  msisdn,
  originator_id
) => {
  return (`<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'
  xmlns:api='http://cps.huawei.com/cpsinterface/api_requestmgr'
  xmlns:req='http://cps.huawei.com/cpsinterface/request'
  xmlns:com='http://cps.huawei.com/cpsinterface/common'>
  <soapenv:Header/>
  <soapenv:Body>
      <api:Request>
          <req:Header>
              <req:Version>1.0</req:Version>
              <req:CommandID>InitTrans_SIMO ATM Transfer Voucher</req:CommandID>
              <req:OriginatorConversationID>${originator_id}</req:OriginatorConversationID>
              <req:Caller>
                  <req:CallerType>2</req:CallerType>
                  <req:ThirdPartyID>Almoco</req:ThirdPartyID>
                  <req:Password>r5DkO5XDUewP1Xj34ZUXDsPluKW3NVD5hS/VECmI169HscLtmnKtvIM4lX2hXW23LbI5zjcfhphmIX8z+22K182bmVNDWDh45G3ZiXA+7FV2DAwJ3JRhihrfXS3KUIqtQLGfxGJSVIN7LTuytHdwrxE/EsvpCJ6A45BK8AUXwhx/bIfYPTkVtK87FZ0Y3lHDXSALJ5Da0dpxtfRXdKd5eKMSXvYQVB9DSMpj9YyYIbF5ZuPFzAVypMocGW9L3mgf6FdIq7K0XcWdEAWvRmj4DTAgNKYd/0uTNAhnlCueSxt1Fg8CdvAKkHjS+HbIq+I7d5tQXf/fwVOmkPr5FY6N8w==</req:Password>
                  <req:ResultURL>https://10.201.239.73:18328/G2</req:ResultURL>
              </req:Caller>
              <req:KeyOwner>1</req:KeyOwner>
              <req:Timestamp>20171113133815</req:Timestamp>
          </req:Header>
          <req:Body>
              <req:Identity>
                  <req:Initiator>
                      <req:IdentifierType>1</req:IdentifierType>
                      <req:Identifier>${msisdn}</req:Identifier>
                      <req:SecurityCredential>${password}</req:SecurityCredential>
                  </req:Initiator>
              </req:Identity>
              <req:TransactionRequest>
                  <req:Parameters>
                      <req:Parameter>
                          <com:Key>ReasonType</com:Key>
                          <com:Value>Buy Goods Voucher</com:Value>
                      </req:Parameter>
                  </req:Parameters>
              </req:TransactionRequest>
          </req:Body>
      </api:Request>
  </soapenv:Body>
</soapenv:Envelope>`);
};

module.exports = {
  SIMO_ATM_TransferVoucher,
};
