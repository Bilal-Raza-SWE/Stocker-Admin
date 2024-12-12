import Sidebar from '@/components/Dashboard/sidebar'
import ReportsGenerator from '@/components/analytics/reports-generator'

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
      <ReportsGenerator />
      </main>
    </div>
  )
}

