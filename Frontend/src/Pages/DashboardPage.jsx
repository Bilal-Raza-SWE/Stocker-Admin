import Sidebar from '../components/dashboard/Sidebar'
import WeatherDashboard from '../components/dashboard/weather-dashboard'
import "../styles/weather-animations.css";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <WeatherDashboard />
    </div>
  )
}

export default Dashboard;

