import { motion } from "framer-motion";

import Header from "../common/Header";
import StatCard from "../common/StatCard";
import { AlarmClock, Layers, Pause, PiggyBankIcon } from "lucide-react";
import CategoryDistributionChart from "../Overview/CategoryDistributionChart";
import CampaignTable from "../campaigns/CampaignTable";
import CampaignTrendChart from "./CampaignTrendChart";

const CampaignPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Products" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Campaigns"
            icon={Layers}
            value={1234}
            color="#6366F1"
          />
          <StatCard
            name="Urgent Campaigns"
            icon={AlarmClock}
            value={89}
            color="#10B981"
          />
          <StatCard
            name="Inactive Campaigns"
            icon={Pause}
            value={23}
            color="#F59E0B"
          />
          <StatCard
            name="Total Funds Raised"
            icon={PiggyBankIcon}
            value={"543,210 Birr"}
            color="#EF4444"
          />
        </motion.div>

        <CampaignTable />

        {/* CHARTS */}
        <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          <CampaignTrendChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};
export default CampaignPage;
