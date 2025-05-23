import { Route, Routes } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import CampaignPage from "./pages/CampaignPage";
import Sidebar from "./components/Sidebar";
import "./index.css";
import UsersPage from "./pages/UserPage";
import DonationsPage from "./pages/DonationsPage";
import TransactionsPage from "./pages/TransactionsPage";
function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* BG */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/campaigns" element={<CampaignPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </div>
  );
}

export default App;
