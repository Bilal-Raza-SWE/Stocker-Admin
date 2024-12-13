import { useState, useEffect } from "react";
import { Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function InventoryList() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(false); // State variable to trigger data re-fetch
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // Fetch inventory items from backend
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/inventory`) // Replace with your backend endpoint
      .then((response) => response.json())
      .then((data) => {
        setInventoryItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
        setLoading(false);
      });
  }, [refreshData]); // Re-fetch data when refreshData changes

  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/inventory/${itemId}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setRefreshData((prev) => !prev); // Toggle refreshData to trigger useEffect
          } else {
            console.error("Failed to delete item.");
          }
        })
        .catch((error) => console.error("Error deleting item:", error));
    }
  };

  const handleUpdate = (itemId) => {
    navigate(`/inventory/add?itemId=${itemId}`);
  };

  const filteredItems = inventoryItems.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div>Loading...</div>; // Add a better loading indicator if needed
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Add SearchBar */}
      <div className="relative w-64 left-1/2 ml-24 mb-5">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

      {/* Inventory Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Product ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Quantity in Stock</TableHead>
              <TableHead>Price per Unit</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Last Re-Stocked</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item._id}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.quantityInStock}</TableCell>
                <TableCell>
                  ${item.pricePerUnit ? item.pricePerUnit.toFixed(2) : "N/A"}
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>
                  {item.dateAdded
                    ? new Date(item.dateAdded).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleUpdate(item._id)}>
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
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
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
