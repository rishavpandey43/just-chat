const cors = require('cors');

const whiteList = [
  'http://localhost:3000',
  'https://localhost:3443',
  'http://localhost:3001',
  'http://192.168.43.240:3000',
  'https://192.168.43.240:3443',
  'http://192.168.43.240:3001',
  'https://justchat1.netlify.app',
];

/* Configure the server to handle CORS requests, send tokens using authorization header, and also for handling server-based cookie */
const corsOptionDelegate = (req, callback) => {
  let corsOptions;
  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    };
  } else corsOptions = { origin: false, credentials: false };
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionDelegate);
