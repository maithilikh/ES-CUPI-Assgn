import StockChart from "./StockChart";

function StockCard({ stock }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-bold">{stock.ticker}</h3>

      <p>${stock.price}</p>

      <p className="text-sm text-gray-500">
        {new Date(stock.updatedAt).toLocaleTimeString()}
      </p>

      {/* <p>Change: {stock.change}</p> */}
      <p className={stock.change >= 0 ? "text-green-600" : "text-red-600"}>
        {stock.change >= 0 ? "+" : ""}
        {stock.change}
      </p>

      <StockChart history={stock.history} />
    </div>
  );
}

export default StockCard;
