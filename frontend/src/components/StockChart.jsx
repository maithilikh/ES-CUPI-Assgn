import {
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function StockChart({ history }) {
  const data = history.map((value, index) => ({
    point: index + 1,
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height={140}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 20, bottom: 25, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis
          dataKey="point"
          tickLine={false}
          axisLine={false}
          label={{ value: "Samples", position: "insideBottom", offset: -10 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={50}
          label={{ value: "Price", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Line type="monotone" dataKey="value" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default StockChart;
