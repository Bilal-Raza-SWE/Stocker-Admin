import { useState, useEffect } from "react";
import { Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserDetails() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]); // Initialize as an empty array
  const navigate = useNavigate();
  const itemsPerPage = 10;

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log(data);
        setUsers(data); // Set the fetched users to the state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (users.length === 0) {
    return <div className="p-6 max-w-[1200px] mx-auto">Loading users...</div>;
  }
const handleUpdate = (id) => {
  navigate(`/users/add?userId=${id}`);
}
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      alert("Failed to delete user: " + error.message);
      return;
    }

    // Remove user from the state (UI) without re-fetching
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    alert("User deleted successfully!");
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("An error occurred while deleting the user.");
  }
};

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-2">
          Admin User Management / View User details
        </div>
      </div>

      {/* User Details Table */}
      <div className="bg-card rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between relative">
            <h1 className="text-2xl font-semibold">User Details</h1>
            {/* Add SearchBar */}
            <span className="absolute w-64 left-1/2 ml-24">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </span>
            {/* Add Buttons */}
            <div className="flex gap-2">
              <Button>All Users</Button>

              <Link to="/users/add">
                <Button variant="outline">Add User</Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between py-4 hover:bg-accent/50 rounded-lg px-4 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || ""} alt={user.name} />
                    <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="w-12">{user.id}</div>
                  <div className="flex-1">{user.firstName}</div>
                  <div className="flex-1">{user.email}</div>
                  <div className="w-24">{user.role}</div>
                  <div className="w-24">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                  <div className="w-24">{user.lastLogin}</div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={()=>handleUpdate(user._id)}>Update</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600"  onClick={() => handleDelete(user._id)} >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 py-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center space-x-1">
            {pages.map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
