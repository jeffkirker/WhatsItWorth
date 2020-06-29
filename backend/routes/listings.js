const express = require("express");

const router = express.Router();

const listingController = require('../controllers/listings');

router.get("/keywords/:keywords", listingController.getListingsFromKeyword);

router.get("/details", listingController.getListingDetails);

module.exports = router;