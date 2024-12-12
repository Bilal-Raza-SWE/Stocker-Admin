import Sidebar from '@/components/Dashboard/Sidebar'
import InventoryLogs from '@/components/logs/inventory-logs'

export default function InventoryLogsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <InventoryLogs />
      </main>
    </div>
  )
}

