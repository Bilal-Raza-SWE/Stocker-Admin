import Sidebar from '../../components/Dashboard/Sidebar'
import AddInventory from '../../components/Inventory-Management/Add-Inventory'

export default function InventorySetupPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <AddInventory />
      </main>
    </div>
  )
}

