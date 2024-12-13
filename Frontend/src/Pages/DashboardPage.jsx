import Sidebar from '../components/dashboard/Sidebar'
import WeatherDashboard from '../components/dashboard/weather-dashboard'
import "../styles/weather-animations.css";
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
function Dashboard() {
  //const navigate = useNavigate();

  // Check token and redirect
  // const checkAuthentication = () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       navigate("/login"); // Redirect to login if no token
  //     }
  //   } catch (error) {
  //     console.error("Error retrieving token:", error);
  //     navigate("/login");
  //   }
  // };

  // useEffect(() => {
  //   checkAuthentication();
  // }, []);
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <WeatherDashboard />
    </div>
  )
}

export default Dashboard;

