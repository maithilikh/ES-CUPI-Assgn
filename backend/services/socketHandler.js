const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { users } = require("./socketStore");

module.exports = (io, socket) => {
  socket.on("register-user", async ({ token }) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      if (!user) return;

      users.set(socket.id, {
        userId: user._id.toString(),
      });
    } catch {}
  });

  socket.on("disconnect", () => {
    users.delete(socket.id);
  });
};
