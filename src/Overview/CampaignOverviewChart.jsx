import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
const campaignsData = [
  // { name: "Jul", campaigns: 4200 },
  // { name: "Aug", campaigns: 3800 },
  // { name: "Sep", campaigns: 5100 },
  // { name: "Oct", campaigns: 4600 },
  // { name: "Nov", campaigns: 5400 },
  { name: "Dec", campaigns: 7 },
  { name: "Jan", campaigns: 3 },
  { name: "Feb", campaigns: 15 },
  // { name: "Mar", campaigns: 5 },
  // { name: "Apr", campaigns: 6300 },
  // { name: "May", campaigns: 7100 },
  // { name: "Jun", campaigns: 7500 },
];
const CampaignOverviewChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Campaign Overview
      </h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={campaignsData}>
            <CartesianGrid strokeDasharray="3.3" storke="#4B5563" />

            <XAxis dataKey={"name"} />
            <YAxis storke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#485563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            ></Tooltip>
            <Line
              type="monotone"
              dataKey="campaigns"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CampaignOverviewChart;
