import { useEffect, useState } from "react";

import api from "../api/api";

import { Navigate } from "react-router-dom";

import Navbar from "../components/NavBar";

import StockCard from "../components/StockCard";

import useStocks from "../hooks/useStocks";

function Dashboard() {
  const [all, setAll] = useState([]);

  const [loading, setLoading] = useState(true);

  const [subs, setSubs] = useState([]);

  const [ticker, setTicker] = useState("");

  const stocks = useStocks();

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  //   const load = async () => {
  //     const s = await api.get("/stocks/supported");

  //     const u = await api.get("/stocks/subscriptions");

  //     setAll(s.data.stocks);

  //     setSubs(u.data.subscriptions);
  //   };

  const load = async () => {
    try {
      const s = await api.get("/stocks/supported");

      const u = await api.get("/stocks/subscriptions");

      setAll(s.data.stocks);

      setSubs(u.data.subscriptions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const subscribe = async () => {
    try {
      if (!ticker) return;

      const res = await api.post("/stocks/subscribe", {
        ticker,
      });

      setSubs(res.data.subscriptions);

      setTicker("");
    } catch {
      alert("Unable to subscribe");
    }
  };

  const unsubscribe = async (ticker) => {
    try {
      const res = await api.delete("/stocks/unsubscribe", {
        data: {
          ticker,
        },
      });

      setSubs(res.data.subscriptions);
    } catch {
      alert("Unable to unsubscribe");
    }
  };

  const available = all.filter((s) => !subs.includes(s));

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }
  return (
    <>
      <Navbar />

      <div className="p-6">
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex gap-2">
            <select
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="border p-2"
            >
              <option value="">Select</option>

              {available.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <button
              disabled={!ticker}
              onClick={subscribe}
              className="bg-black text-white px-4"
            >
              Subscribe
            </button>
          </div>

          <div className="flex gap-2 mt-4 flex-wrap">
            {subs.map((s) => (
              <button
                key={s}
                onClick={() => unsubscribe(s)}
                className="bg-red-500 text-white px-2 py-1"
              >
                {s} ✕
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {stocks.map((stock) => (
            <StockCard key={stock.ticker} stock={stock} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
