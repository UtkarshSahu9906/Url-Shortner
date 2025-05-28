const express = require("express");
const router = express.Router();
const {handleGenrateNewShortURL,handleShowAll,handleGetAnalytics} = require('../controllers/url');

router.post('/',handleGenrateNewShortURL).get('/',handleShowAll).get("/analytics/:shortId",handleGetAnalytics);

module.exports
=router;