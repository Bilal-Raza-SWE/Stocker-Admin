import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/Authentication/LoginPage";
import SignUpPage from "./Pages/Authentication/SignUpPage";
import DashboardPage from "./Pages/DashboardPage";
import UserManagementPage from "./Pages/User-Management/User-ManagementPage";
import ShowUsersPage from "./Pages/User-Management/Show-UsersPage";


import InventoryLogsPage from "./Pages/logs/InventoryLogsPage";
import SystemLogsPage from "./Pages/logs/SystemLogsPage";
import AnalyticsPage from "./Pages/Analytics Page/AnalyticsPage";
import Reports from "./Pages/Analytics Page/GenerateReportsPage";
import Settings from "./Pages/SettingsPage";

import InventoryForm from "./components/Inventory-Management/InventoryForm";

import InventoryList from "./components/Inventory-Management/Show-Inventory";
import InventoryPage from "./Pages/Inventory-Management/Show-InventoryPage";
import AddLocation from "./components/Inventory-Management/Add-Location";
function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* User Management Routes */}
        <Route path="/users" element={<ShowUsersPage />} />
        <Route path="/users/add" element={<UserManagementPage />} />

        {/* Inventory Management Routes */}
        <Route path="/inventory" element={<InventoryPage />}>
          <Route path="add" element={<InventoryForm />} />
          <Route path="addLocation" element={<AddLocation />} />
          <Route index element={<InventoryList />} />
        </Route>

        {/* Logs Routes */}
        <Route path="/logs/inventory" element={<InventoryLogsPage />} />
        <Route path="/logs/system" element={<SystemLogsPage />} />

        {/* Analytics Routes */}
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/analytics/reports" element={<Reports />} />

        {/* Settings Route */}
        <Route path="/settings" element={<Settings />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
