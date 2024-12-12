import Sidebar from '../../components/Dashboard/Sidebar'
import UserManagement from '../../components/User-Management/user-management'

export default function UsersPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <UserManagement />
      </main>
    </div>
  )
}

