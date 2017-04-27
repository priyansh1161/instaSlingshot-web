'use strict';

const yelp = require('yelp-fusion');
const express = require('express');
const router = express.Router();
// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = 'wqoBRDSm6lOX6h1V0eRZqw';
const clientSecret = 'bpRG0aUpbeEWiRKbaQQXgx8y6U1QjOjUcIRdUd5V5zJwcXW0ujh1QuQ5iR48ItHr';


router.get('/',(req, res) => {
    console.log(req.query);
    if(req.query.lng && req.query.lat){
        const searchRequest = {
            term:'restaurants',
            open_now : true,
            latitude : req.query.lat,
            longitude : req.query.lng
        };
        yelp.accessToken(clientId, clientSecret).then(response => {
            const client = yelp.client(response.jsonBody.access_token);

            client.search(searchRequest).then(response => {
                const result = response.jsonBody.businesses;
                console.log(result);
                res.send(result);
            })
                .catch(e => res.status(500).send(e.message));
        }).catch(e => res.status(500).send(e.message));
    }
    else {
        res.status(404).send('Wrong Query');
    }

});

module.exports = router;
