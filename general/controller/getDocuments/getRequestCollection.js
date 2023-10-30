const dbConnections = require("../../../dataBaseConnections");

const getRequestCollectionDocuments = async (req, res) => {
  const collectionName = req.body.collectionName
  console.log(collectionName)
  try {
    const collection = dbConnections.apiRequestDB.db.collection(collectionName)
    collection.find({}).toArray((err, documents) => {
        if (err) {
          console.error(err);
        } else {
          console.log(documents);
          return res.status(200).json({
            status: 200,
            response: "request was succesfully executed😄",
            documents
          });
        }
      });
  } catch (err) {
    return res.status(400).json({ error: "unable to fetch Documents", status: 400 });
  }
};

module.exports = getRequestCollectionDocuments;
