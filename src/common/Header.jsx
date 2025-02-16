const Header = ({ title }) => {
  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w7xl mx-auto py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
        <div className="w-12 h-12 rounded-full bg-red-400 text-white flex justify-center items-center font-semibold text-xl">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;
