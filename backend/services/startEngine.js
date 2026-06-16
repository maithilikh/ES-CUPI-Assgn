const User = require("../models/User");

const { users } = require("./socketStore");

const { stocks, updateStock } = require("./stockEngine");

module.exports = (io) => {
  setInterval(async () => {
    const latest = {};

    Object.keys(stocks).forEach((ticker) => {
      latest[ticker] = updateStock(ticker);
    });

    for (const [socketId, data] of users.entries()) {
      const user = await User.findById(data.userId);

      if (!user) continue;

      const payload = user.subscriptions.map((ticker) => latest[ticker]);

      io.to(socketId).emit("stock-update", payload);
    }
  }, 2000);
};
