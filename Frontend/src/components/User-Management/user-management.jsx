"use client";

import { Card } from "@/components/ui/card.jsx";
import UserForm from "./user-form";
import { Button } from "@/components/ui/button";

export default function UserManagement() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="text-sm text-muted-foreground mb-2">
          Admin User Management / Add user
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Add new User</h1>
          {/* Add Buttons  */}
          <div className="flex gap-2  ">
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/users")}
            >
              All Users
            </Button>
            <Button>Add User</Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <Card className="p-6">
        <UserForm />
      </Card>
    </div>
  );
}
