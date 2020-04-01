const cors = require("cors");

const whiteList = [
  "http://localhost:3000",
  "https://localhost:3443",
  "http://localhost:3001"
];

const corsOptionDelegate = (req, callback) => {
  let corsOptions;
  if (whiteList.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, credentials: true };
  } else corsOptions = { origin: false, credentials: false };
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionDelegate);
