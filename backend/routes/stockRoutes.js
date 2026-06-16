const express = require("express");

const auth = require("../middleware/auth");

const {
  getSupportedStocks,
  getSubscriptions,
  subscribe,
  unsubscribe,
} = require("../controllers/stockController");

const router = express.Router();

router.get("/supported", auth, getSupportedStocks);

router.get("/subscriptions", auth, getSubscriptions);

router.post("/subscribe", auth, subscribe);

router.delete("/unsubscribe", auth, unsubscribe);

module.exports = router;
