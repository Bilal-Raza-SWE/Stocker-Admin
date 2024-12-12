import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import DashboardPage from "./Pages/DashboardPage";
import UserManagementPage from "./Pages/User-Management/User-ManagementPage";
import ShowUsersPage from "./Pages/User-Management/Show-UsersPage";
import AddInventoryPage from "./Pages/Inventory-Management/Add-InventoryPage";
import AddLocationPage from "./Pages/Inventory-Management/Add-locationPage";
import ShowInventoryPage from "./Pages/Inventory-Management/Show-InventoryPage";
import InventoryLogsPage from "./pages/logs/InventoryLogsPage";
import SystemLogsPage from "./pages/logs/SystemLogsPage";
import AnalyticsPage from "./Pages/Analytics Page/AnalyticsPage";
import Reports from "./Pages/Analytics Page/GenerateReportsPage";
import Settings from "./Pages/SettingsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard route */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Users route */}
        <Route path="/users" element={<ShowUsersPage />} />
        <Route path="/users/add" element={<UserManagementPage />} />

        {/* Inentory Management Route */}
        <Route path="/inventory" element={<ShowInventoryPage />} />
        <Route path="/inventory/add" element={<AddInventoryPage />} />
        <Route path="/inventory/location/add" element={<AddLocationPage />} />

        {/* Logs routes */}
        <Route path="/logs/inventory" element={<InventoryLogsPage />} />
        <Route path="/logs/system" element={<SystemLogsPage />} />

        {/* Analytics route */}
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/analytics/reports" element={<Reports />} />

        {/* Settings route */}
        <Route path="/settings" element={<Settings />} />


        {/* 404 route - should be last */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;


/*
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SideBar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import StockReceived from './pages/StockReceived';
import PickingAndPacking from './pages/PickingAndPacking';
import DispatchManagement from './pages/DispatchManagement';
import Inventory from './pages/Inventory';
import EquipmentManagement from './pages/EquipmentManagement';

function App() {
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <SideBar />
      
      {Main Content}
      <div className={`flex-1 ${isDashboard ? '' : 'p-2 sm:ml-16 md:ml-20'}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stock-received" element={<StockReceived />} />
          <Route path="/pickingandpacking" element={<PickingAndPacking />} />
          <Route path="/dispatch-management" element={<DispatchManagement />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/equipment-management" element={<EquipmentManagement />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

*/