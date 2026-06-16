import { useEffect, useState } from "react";

import socket from "../services/socket";

export default function useStocks() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    socket.connect();

    socket.emit("register-user", {
      token,
    });

    socket.on("stock-update", (data) => {
      //   setStocks(data);
      setStocks([...data].sort((a, b) => a.ticker.localeCompare(b.ticker)));
    });

    return () => {
      socket.off("stock-update");
      socket.disconnect();
    };
  }, []);

  return stocks;
}
