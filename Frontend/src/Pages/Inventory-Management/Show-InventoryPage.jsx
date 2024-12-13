import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Dashboard/Sidebar'
import ShowInventory from '../../components/Inventory-Management/Show-Inventory'
import InventoryHeader from '@/components/Inventory-Management/InventoryHeader'

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar /> 
      <div className='w-full'>
          <InventoryHeader/>
          <Outlet/>
      </div>
   
    </div>
  )
}

