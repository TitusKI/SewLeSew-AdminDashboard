import React from "react";
import Header from "../common/Header";
import { motion } from "framer-motion";
import { FileText, Layers, User, UserPlus } from "lucide-react";
import StatCard from "../common/StatCard";
import CampaignOverviewChart from "../Overview/CampaignOverviewChart";
import CategoryDistributionChart from "../Overview/CategoryDistributionChart";
const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Overview" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="New Users"
            icon={UserPlus}
            value="4"
            color="#8B5CF6"
          />
          <StatCard name="Total Users" icon={User} value="24" color="#6366F1" />

          <StatCard
            name="Total Campaigns"
            icon={Layers}
            value="20"
            color="#FC4899"
          />
          <StatCard
            name="Total Reports"
            icon={FileText}
            value="34"
            color="#10B981"
          />
        </motion.div>
        {/*  Charts  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CampaignOverviewChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
