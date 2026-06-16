import { LineChart, Line, ResponsiveContainer } from "recharts";

function StockChart({ history }) {
  const data = history.map((v) => ({
    value: v,
  }));

  return (
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="value" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default StockChart;
