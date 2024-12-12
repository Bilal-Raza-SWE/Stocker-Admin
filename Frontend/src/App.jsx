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
import AddInventoryPage from "./Pages/Inventory-Management/Add-InventoryPage";
import AddLocationPage from "./Pages/Inventory-Management/Add-locationPage";
import ShowInventoryPage from "./Pages/Inventory-Management/Show-InventoryPage";
import InventoryLogsPage from "./pages/logs/InventoryLogsPage";
import SystemLogsPage from "./pages/logs/SystemLogsPage";
import AnalyticsPage from "./Pages/Analytics Page/AnalyticsPage";
import Reports from "./Pages/Analytics Page/GenerateReportsPage";
import Settings from "./Pages/SettingsPage";

function App() {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists

  return (
    <Router>
      <Routes>
        {/* Default Route: Redirect based on authentication */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          }
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
          }
        />

        {/* Sign Up Route */}
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUpPage />
          }
        />

        {/* Protected Routes */}
        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />
          }
        />

        {/* Users Route */}
        <Route
          path="/users"
          element={
            isAuthenticated ? <ShowUsersPage /> : <Navigate to="/login" replace />
          }
        />
        {}
        <Route
          path="/users/add"
          element={
            isAuthenticated ? <UserManagementPage /> : <Navigate to="/login" replace />
          }
        />

        {/* Inventory Management Route */}
        <Route
          path="/inventory"
          element={
            isAuthenticated ? <ShowInventoryPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/inventory/add"
          element={
            isAuthenticated ? <AddInventoryPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/inventory/location/add"
          element={
            isAuthenticated ? <AddLocationPage /> : <Navigate to="/login" replace />
          }
        />

        {/* Logs Routes */}
        <Route
          path="/logs/inventory"
          element={
            isAuthenticated ? <InventoryLogsPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/logs/system"
          element={
            isAuthenticated ? <SystemLogsPage /> : <Navigate to="/login" replace />
          }
        />

        {/* Analytics Route */}
        <Route
          path="/analytics"
          element={
            isAuthenticated ? <AnalyticsPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/analytics/reports"
          element={
            isAuthenticated ? <Reports /> : <Navigate to="/login" replace />
          }
        />

        {/* Settings Route */}
        <Route
          path="/settings"
          element={
            isAuthenticated ? <Settings /> : <Navigate to="/login" replace />
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;


























// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import "./App.css";
// import LoginPage from "./Pages/Authentication/LoginPage";
// import SignUpPage from "./Pages/Authentication/SignUpPage";
// import DashboardPage from "./Pages/DashboardPage";
// import UserManagementPage from "./Pages/User-Management/User-ManagementPage";
// import ShowUsersPage from "./Pages/User-Management/Show-UsersPage";
// import AddInventoryPage from "./Pages/Inventory-Management/Add-InventoryPage";
// import AddLocationPage from "./Pages/Inventory-Management/Add-locationPage";
// import ShowInventoryPage from "./Pages/Inventory-Management/Show-InventoryPage";
// import InventoryLogsPage from "./pages/logs/InventoryLogsPage";
// import SystemLogsPage from "./pages/logs/SystemLogsPage";
// import AnalyticsPage from "./Pages/Analytics Page/AnalyticsPage";
// import Reports from "./Pages/Analytics Page/GenerateReportsPage";
// import Settings from "./Pages/SettingsPage";

// function App() {
//   const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists

//   return (
//     <Router>
//       <Routes>
//          {/* Redirect unauthenticated users */}
//          <Route
//           path="/"
//           element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
//         />

//         {/* Login Route */}
//         <Route path="/login" element={<LoginPage />} />

//         {/* Sign Up Route */}
//         <Route path="/signup" element={<SignUpPage />} />

//         {/* Protected Dashboard Route */}
//  {/* Protected Dashboard Route */}
//  <Route
//           path="/dashboard"
//           element={
//             isAuthenticated ? (
//               <DashboardPage />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//         {/* Dashboard route */}
//         <Route path="/dashboard" element={<DashboardPage />} />

//         {/* Users route */}
//         <Route path="/users" element={<ShowUsersPage />} />
//         <Route path="/users/add" element={<UserManagementPage />} />

//         {/* Inentory Management Route */}
//         <Route path="/inventory" element={<ShowInventoryPage />} />
//         <Route path="/inventory/add" element={<AddInventoryPage />} />
//         <Route path="/inventory/location/add" element={<AddLocationPage />} />

//         {/* Logs routes */}
//         <Route path="/logs/inventory" element={<InventoryLogsPage />} />
//         <Route path="/logs/system" element={<SystemLogsPage />} />

//         {/* Analytics route */}
//         <Route path="/analytics" element={<AnalyticsPage />} />
//         <Route path="/analytics/reports" element={<Reports />} />

//         {/* Settings route */}
//         <Route path="/settings" element={<Settings />} />


//         {/* 404 route - should be last */}
//         <Route path="*" element={<Navigate to="/signup" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
