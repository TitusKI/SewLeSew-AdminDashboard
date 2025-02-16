import { motion } from "framer-motion";

import Header from "../common/Header";
import StatCard from "../common/StatCard";
import { AlarmClock, Layers, Pause, PiggyBankIcon } from "lucide-react";
import CategoryDistributionChart from "../Overview/CategoryDistributionChart";
import CampaignTable from "../campaigns/CampaignTable";
import { useState, useEffect } from "react";
import { getCampaignStats } from "../service/campaign";
const CampaignPage = () => {
  const [campaignStats, setCampaignStats] = useState({
    totalCampaign: 0,
    totalMoneyRaised: 0,
    statusCount: {
      activeCampaignsCount: 0,
      closedCampaignsCount: 0,
    },
  });

  useEffect(() => {
    const fetchCampaignStats = async () => {
      try {
        console.log("fetching");
        const res = await getCampaignStats();
        console.log("fetched");
        if (res && res.meta) {
          setCampaignStats(res.meta);
          console.log(res.meta);
        } else {
          console.warn("Invalid response structure:", res);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCampaignStats();
  }, []);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Campaigns" />

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
            value={campaignStats.totalCampaign}
            color="#6366F1"
          />
          <StatCard
            name="Open Campaigns"
            icon={AlarmClock}
            value={
              campaignStats.statusCount.activeCampaignsCount
              // statusCount.activeCampaignsCount || 0
            }
            color="#10B981"
          />
          <StatCard
            name="Closed Campaigns"
            icon={Pause}
            value={campaignStats.statusCount.closedCampaignsCount}
            // statusCount.closedCampaignsCount || 0}
            color="#F59E0B"
          />
          <StatCard
            name="Total Funds Raised"
            icon={PiggyBankIcon}
            value={`${campaignStats.totalMoneyRaised || 0} Birr`}
            color="#EF4444"
          />
        </motion.div>

        <CampaignTable />

        {/* CHARTS */}
        <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          {/* <CampaignTrendChart /> */}
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};
export default CampaignPage;
