import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { getCampaigns, changeCampaignStatus } from "../service/campaign";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Carousel, CarouselItem } from "../components/Carousel";

const ImageModal = ({ images, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div
        className="bg-white p-4 rounded-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <Carousel>
          {images?.length > 0 &&
            images.map((img) => (
              <CarouselItem key={img.id}>
                <img
                  src={img.url}
                  alt="Images"
                  className="w-full h-96 object-cover rounded-lg border"
                />
              </CarouselItem>
            ))}
        </Carousel>{" "}
        <button
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
const DocsModal = ({ docs, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div
        className="bg-white p-4 rounded-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <Carousel>
          {docs?.length > 0 &&
            docs.map((doc) => (
              <div key={doc.id}>
                {doc.url.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                  <CarouselItem>
                    <img
                      src={doc.url}
                      alt="Images"
                      className="w-full h-96 object-cover rounded-lg border"
                    />
                  </CarouselItem>
                ) : (
                  <div className="flex flex-col items-center">
                    <p className="text-black mb-2">PDF Document</p>
                    <iframe
                      src={doc.url}
                      className="w-full h-96 border rounded-md shadow-lg"
                      title="PDF Preview"
                    />
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400"
                    >
                      Open PDF in New Tab
                    </a>
                  </div>
                )}
              </div>
            ))}
        </Carousel>{" "}
        <button
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CampaignTable = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filteredCampaigns, setFilteredCampaigns] = useState(CAMPAIGN_DATA);
  const [campaigns, setCampaigns] = useState([]);

  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);

  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshData = () => setRefreshKey((prev) => prev + 1);
  const handleStatusChange = async (id, status) => {
    try {
      const response = await changeCampaignStatus(id, status);
      console.log("Status updated:", response);

      // ✅ Refresh the data after updating status (optional)
      // fetchCampaigns();
      refreshData(); // 🔥 Call this to refetch
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleInspect = (images) => {
    setSelectedImages(images);
    setIsModalOpen(true);
  };

  const handleDocsInspect = (docs) => {
    setSelectedDocs(docs);
    setIsDocsModalOpen(true);
  };

  // const handleSearch = (e) => {
  //   const term = e.target.value.toLowerCase();
  //   setSearchTerm(term);
  //   const filtered = CAMPAIGN_DATA.filter(
  //     (campaign) =>
  //       campaign.name.toLowerCase().includes(term) ||
  //       campaign.category.toLowerCase().includes(term)
  //   );

  //   setFilteredCampaigns(filtered);
  // };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await getCampaigns(1, 10);
        setCampaigns(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCampaigns();
  }, [refreshKey]);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Campaign List</h2>
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Search campaigns..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div> */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Target
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Goal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Tin
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                License Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Images
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Documents
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {campaigns.map((campaign) => (
              <motion.tr
                key={campaign.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {campaign.title}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="text-xs">
                    {campaign.category.split("_").join(" ")}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="text-xs">
                    {campaign.business
                      ? campaign.business.fullName
                      : campaign.charity.fullName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="text-xs">{campaign.goalAmount}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="text-xs">
                    {campaign.business
                      ? campaign.business.tinNumber
                      : campaign.charity.isOrganization
                      ? campaign.charity.tinNumber
                      : "Personal"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <div className="text-xs">
                    {campaign.business
                      ? campaign.business.tinNumber
                      : campaign.charity.isOrganization
                      ? campaign.charity.tinNumber
                      : "Personal"}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="px-3 py-1 border border-blue-300 rounded-md hover:bg-blue-300 hover:text-blue-950 active:bg-blue-200 duration-200"
                    onClick={() => handleInspect(campaign.campaignMedia)}
                  >
                    Inspect
                  </button>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="px-3 py-1 border border-blue-300 rounded-md hover:bg-blue-300 hover:text-blue-950 active:bg-blue-200 duration-200"
                    onClick={() =>
                      handleDocsInspect(
                        campaign.business
                          ? campaign.business.docs
                          : campaign.charity.docs
                      )
                    }
                  >
                    Inspect
                  </button>{" "}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 mr-2"
                    onClick={() => handleStatusChange(campaign.id, "ACTIVE")}
                  >
                    <FaCheck size={18} />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleStatusChange(campaign.id, "REJECTED")}
                  >
                    <FaTimes size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <ImageModal
            images={selectedImages}
            onClose={() => {
              console.log(selectedImages);
              setIsModalOpen(false);
            }}
          />
        )}
        {isDocsModalOpen && (
          <DocsModal
            docs={selectedDocs}
            onClose={() => {
              console.log(selectedImages);
              setIsDocsModalOpen(false);
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default CampaignTable;
