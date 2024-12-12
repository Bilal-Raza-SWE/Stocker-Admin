import Sidebar from '../../components/Dashboard/Sidebar'
import ShowInventory from '../../components/Inventory-Management/Show-Inventory'

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <ShowInventory />
      </main>
    </div>
  )
}

