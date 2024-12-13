"use client";

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
import { Textarea } from "@/components/ui/textarea.jsx";

export default function UserForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "",
    status: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  // Fetch user data if updating
  useEffect(() => {
    if (userId) {
      setIsUpdating(true);
      setLoading(true);
      const fetchUser = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }
          const data = await response.json();
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            password: "", // Keep password blank for security
            phone: data.phoneNumber || "",
            address: data.address || "",
            role: data.role || "",
            status: data.status || "",
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
          alert("Failed to fetch user details.");
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        ...(formData.password && { password: formData.password }), // Include password only if it's provided
        phoneNumber: formData.phone,
        address: formData.address,
        role: formData.role,
        status: formData.status,
      };

      const url = userId
        ? `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`
        : `${import.meta.env.VITE_BACKEND_URL}/users`;
      const method = userId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error saving user:", error);
        alert("Failed to save user: " + error.message);
        return;
      }

      const result = await response.json();
      alert(`User ${userId ? "updated" : "created"} successfully!`);
      navigate("/users");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving the user.");
    }
  };

  const roleOptions = ["Admin", "Manager", "Employee", "User"];
  const statusOptions = ["Active", "Inactive", "Pending"];

  if (loading) {
    return <div className="text-center p-6">Loading user details...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold">
        {isUpdating ? "Update User" : "Add User"}
      </h1>

      <div className="space-y-8">
        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        {!isUpdating && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={!isUpdating}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => navigate("/users")}
        >
          Cancel
        </Button>
        <Button type="submit">{isUpdating ? "Update" : "Save"}</Button>
      </div>
    </form>
  );
}
