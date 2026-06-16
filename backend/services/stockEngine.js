const stocks = {
  GOOG: {
    price: 180,
    history: [],
  },

  TSLA: {
    price: 250,
    history: [],
  },

  AMZN: {
    price: 210,
    history: [],
  },

  META: {
    price: 300,
    history: [],
  },

  NVDA: {
    price: 450,
    history: [],
  },
};

const rand = () => {
  return Number((Math.random() * 6 - 3).toFixed(2));
};

const updateStock = (ticker) => {
  const s = stocks[ticker];

  const delta = rand();

  s.price = Number(Math.max(1, s.price + delta).toFixed(2));

  s.history.push(s.price);

  if (s.history.length > 20) {
    s.history.shift();
  }

  return {
    ticker,
    price: s.price,
    change: delta,
    history: s.history,
    updatedAt: Date.now(),
  };
};

module.exports = {
  stocks,

  updateStock,
};
