import Sidebar from '../../components/Dashboard/Sidebar'
import UserDetails from '../../components/User-Management/user-details'

export default function UsersPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">
        <UserDetails/>
      </main>
    </div>
  )
}

