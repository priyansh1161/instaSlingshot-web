const express = require('express');
const router = express.Router();

const Uber = require('node-uber');

const uber = new Uber({
    client_id: 'OuJau1bb8C2oEvCa9Nd03qXbtlhpcS1k',
    client_secret: 'UdZniUaoW-bfwwPJLM6yoAksNwrSqObN5wYMDRqy',
    server_token: 'Yq7n_nVilXSDVg3gETiayOsdttBmfcXNkGu3meaT',
    name: 'xrdtfcgbhj',
    language: 'en_US'
});

router.get('/',(req, res) =>{
  if(req.query.lat && req.query.lng){
      uber.products.getAllForLocationAsync(req.query.lat, req.query.lng)
          .then((response) => {
            console.log(response);
            res.send(response);
          })
          .catch(err => res.status(500).send(err.message));
  }
});

module.exports = router;

