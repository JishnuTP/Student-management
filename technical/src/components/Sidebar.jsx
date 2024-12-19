import React from "react";
import { FaUserGraduate, FaChartBar, FaCog } from "react-icons/fa";

const Sidebar = () => (
  <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
    {/* Logo Section */}
    <div className="flex items-center justify-center h-20 border-b border-gray-700">
      <h1 className="text-2xl font-bold text-blue-400">Dashboard</h1>
    </div>

    {/* Navigation Menu */}
    <nav className="flex-1 p-4">
      <ul className="space-y-4">
        {/* Students */}
        <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <FaUserGraduate className="text-blue-400" />
          <span className="text-lg">Students</span>
        </li>

        {/* Reports */}
        <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <FaChartBar className="text-blue-400" />
          <span className="text-lg">Reports</span>
        </li>

        {/* Settings */}
        <li className="flex items-center space-x-4 hover:bg-gray-700 p-2 rounded cursor-pointer">
          <FaCog className="text-blue-400" />
          <span className="text-lg">Settings</span>
        </li>
      </ul>
    </nav>

    {/* Footer Section */}
    <div className="p-4 border-t border-gray-700">
      <p className="text-sm text-gray-400">© 2024 Quyl Inc.</p>
    </div>
  </div>
);

export default Sidebar;
