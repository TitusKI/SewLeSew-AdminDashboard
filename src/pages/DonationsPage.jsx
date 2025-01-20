import { motion } from "framer-motion";

import { Users, Heart, BarChart, TrendingUp } from "lucide-react";
import Header from "../common/Header";
import StatCard from "../common/StatCard";
import DonationsOverviewChart from "../donations/DonationsOverviewChart";
import DonationsByCategoryChart from "../donations/DonationsByCategoryChart";
import DailyDonationTrends from "../donations/DailyDonationsTrend";

const donationStats = {
  totalDonations: "1,234,567 Birr",
  averageDonation: "78.90 Birr",
  totalDonors: "3,456",
  donationGrowth: "12.3%",
};

const DonationsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Donations" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* DONATION STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Donations"
            icon={Heart}
            value={donationStats.totalDonations}
            color="#6366F1"
          />
          <StatCard
            name="Avg. Donation Value"
            icon={BarChart}
            value={donationStats.averageDonation}
            color="#10B981"
          />
          <StatCard
            name="Total Donors"
            icon={Users}
            value={donationStats.totalDonors}
            color="#F59E0B"
          />
          <StatCard
            name="Donation Growth"
            icon={TrendingUp}
            value={donationStats.donationGrowth}
            color="#EF4444"
          />
        </motion.div>

        <DonationsOverviewChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DonationsByCategoryChart />
          <DailyDonationTrends />
        </div>
      </main>
    </div>
  );
};

export default DonationsPage;
