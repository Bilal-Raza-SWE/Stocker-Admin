import Sidebar from '@/components/Dashboard/Sidebar'
import AddLocation from '@/components/Inventory-Management/Add-location'

export default function AddLocationPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <AddLocation />
      </main>
    </div>
  )
}

