import Sidebar from '@/components/Dashboard/sidebar'
import AnalyticsDashboard from '@/components/analytics/analytics-dashboard'

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <AnalyticsDashboard />
      </main>
    </div>
  )
}

