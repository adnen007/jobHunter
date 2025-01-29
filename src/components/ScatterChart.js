// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const ScatterChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="date" name="Date" />
        <YAxis dataKey="count" name="Count" allowDecimals={false} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={data} fill="#2563eb" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterChartComponent;
