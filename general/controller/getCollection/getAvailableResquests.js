const dbConnections = require("../../../dataBaseConnections");

const getAvailableRequestCollections = async (req, res) => {
  const db = "apiRequestDB";

  try {
    dbConnections[db].db
      .listCollections()
      .toArray((err, collections) => {
        if (err) {
          return res.status(400).json({ error: err, status: 400 });
        } else {
 
          return res.status(200).json({
            status: 200,
            response: "request was succesfully executed😄",
            collections: collections.map(col => col.name),
          });
        }
      });
  } catch (err) {
    return res.status(400).json({ error: "unable to fetch collection", status: 400 });
  }
};

module.exports = getAvailableRequestCollections;
