import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export default function InventoryHeader() {
  const location = useLocation();

  // Helper function to determine if a route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="text-sm text-muted-foreground mb-2">
        Inventory Management / Show all inventory
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <div className="flex items-center gap-4">
          {/* Show Inventory button */}
          <Link to="/inventory">
            <Button variant={isActive("/inventory") ? "default" : "outline"}>
              Show Inventory
            </Button>
          </Link>

          {/* Add Item button */}
          <Link to="/inventory/add">
            <Button variant={isActive("/inventory/add") ? "default" : "outline"}>
              Add Item
            </Button>
          </Link>

          {/* Add Location button */}
          <Link to="/inventory/addLocation">
            <Button variant={isActive("/inventory/addLocation") ? "default" : "outline"}>
              Add Location
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
