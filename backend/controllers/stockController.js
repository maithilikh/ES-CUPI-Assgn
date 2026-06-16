const User = require("../models/User");
const stocks = require("../config/stocks");

exports.getSupportedStocks = async (req, res) => {
  res.json({
    stocks,
  });
};

exports.getSubscriptions = async (req, res) => {
  const user = await User.findById(req.userId);

  res.json({
    subscriptions: user.subscriptions,
  });
};

exports.subscribe = async (req, res) => {
  const { ticker } = req.body;

  if (!stocks.includes(ticker)) {
    return res.status(400).json({
      message: "Invalid ticker",
    });
  }

  const user = await User.findById(req.userId);

  if (!user.subscriptions.includes(ticker)) {
    user.subscriptions.push(ticker);

    await user.save();
  }

  res.json({
    subscriptions: user.subscriptions,
  });
};

exports.unsubscribe = async (req, res) => {
  const { ticker } = req.body;

  const user = await User.findById(req.userId);

  user.subscriptions = user.subscriptions.filter((s) => s !== ticker);

  await user.save();

  res.json({
    subscriptions: user.subscriptions,
  });
};
