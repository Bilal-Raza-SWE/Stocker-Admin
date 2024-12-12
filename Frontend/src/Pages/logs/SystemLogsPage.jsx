import Sidebar from '@/components/Dashboard/sidebar'
import SystemLogs from '@/components/logs/system-logs'

export default function SystemLogsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <SystemLogs />
      </main>
    </div>
  )
}

