const express = require("express");

const router = express.Router();

const listingController = require('../controllers/listings');

router.get("/:keywords", listingController.getListingsFromKeyword);

module.exports = router;