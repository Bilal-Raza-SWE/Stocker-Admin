
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import InventoryHeader from "./InventoryHeader";

export default function InventoryForm() {
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    quantityInStock: "",
    pricePerUnit: "",
    category: "",
    supplier: "",
    lastRestocked: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get("itemId");

  // Fetch item data if updating
  useEffect(() => {
    if (itemId) {
      setIsUpdating(true);
      setLoading(true);
      const fetchItem = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/inventory/${itemId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch item details");
          }
          const data = await response.json();
          setFormData({
            productId: data.productId || "",
            productName: data.productName || "",
            quantityInStock: data.quantityInStock || "",
            pricePerUnit: data.pricePerUnit || "",
            category: data.category || "",
            supplier: data.supplier || "",
            lastRestocked: data.lastRestocked || "",
          });
        } catch (error) {
          console.error("Error fetching item details:", error);
          alert("Failed to fetch item details.");
        } finally {
          setLoading(false);
        }
      };
      fetchItem();
    }
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = itemId
        ? `${import.meta.env.VITE_BACKEND_URL}/inventory/${itemId}`
        : `${import.meta.env.VITE_BACKEND_URL}/inventory`;
      const method = itemId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error saving item:", error);
        alert("Failed to save item: " + error.message);
        return;
      }

      const result = await response.json();
      alert(`Item ${itemId ? "updated" : "created"} successfully!`);
      navigate("/inventory");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving the item.");
    }
  };

  const categoryOptions = ["Electronics", "Furniture", "Clothing", "Toys", "Books"];

  if (loading) {
    return <div className="text-center p-6">Loading item details...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold">
        {isUpdating ? "Update Inventory Item" : "Add Inventory Item"}
      </h1>

      <div className="space-y-8">
        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="productId">Product ID</Label>
            <Input
              id="productId"
              value={formData.productId}
              onChange={(e) =>
                setFormData({ ...formData, productId: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantityInStock">Quantity in Stock</Label>
            <Input
              id="quantityInStock"
              type="number"
              value={formData.quantityInStock}
              onChange={(e) =>
                setFormData({ ...formData, quantityInStock: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pricePerUnit">Price per Unit ($)</Label>
            <Input
              id="pricePerUnit"
              type="number"
              step="0.01"
              value={formData.pricePerUnit}
              onChange={(e) =>
                setFormData({ ...formData, pricePerUnit: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier</Label>
          <Input
            id="supplier"
            value={formData.supplier}
            onChange={(e) =>
              setFormData({ ...formData, supplier: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastRestocked">Last Re-Stocked</Label>
          <Input
            id="lastRestocked"
            type="date"
            value={formData.lastRestocked}
            onChange={(e) =>
              setFormData({ ...formData, lastRestocked: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => navigate("/inventory")}
        >
          Cancel
        </Button>
        <Button type="submit">{isUpdating ? "Update" : "Save"}</Button>
      </div>
    </form>
  );
}
