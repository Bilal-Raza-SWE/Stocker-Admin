"use client"

import { useState } from 'react'
import { MoreVertical, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogsLayout from './logs-layout'

// Sample data
const inventoryLogs = [
  {
    id: 1,
    productName: 'Supra mk-4',
    change: 'added',
    quantity: 15,
    performedBy: 'Bilal Raza',
    dateTime: '25/09/2024',
    price: 90000.99
  },
  // Add more logs as needed
]

export default function InventoryLogs() {
  const [filters, setFilters] = useState({
    member: '',
    id: '',
    type: '',
    date: ''
  })

  return (
    <LogsLayout title="Inventory Logs">
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 max-w-xs">
          <Select
            value={filters.member}
            onValueChange={(value) => setFilters({...filters, member: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Members" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              <SelectItem value="active">Active Members</SelectItem>
              <SelectItem value="inactive">Inactive Members</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          placeholder="ID"
          value={filters.id}
          onChange={(e) => setFilters({...filters, id: e.target.value})}
          className="max-w-[100px]"
        />

        <div className="flex-1 max-w-xs">
          <Select
            value={filters.type}
            onValueChange={(value) => setFilters({...filters, type: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="added">Added</SelectItem>
              <SelectItem value="removed">Removed</SelectItem>
              <SelectItem value="updated">Updated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({...filters, date: e.target.value})}
          className="max-w-[200px]"
        />

        <Button className="gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>

      {/* Logs Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Change done</TableHead>
              <TableHead>Quantity changed</TableHead>
              <TableHead>Performed By</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Purchase Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.id}</TableCell>
                <TableCell>{log.productName}</TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs capitalize",
                    {
                      'bg-green-100 text-green-800': log.change === 'added',
                      'bg-red-100 text-red-800': log.change === 'removed',
                      'bg-blue-100 text-blue-800': log.change === 'updated'
                    }
                  )}>
                    {log.change}
                  </span>
                </TableCell>
                <TableCell>{log.quantity}</TableCell>
                <TableCell>{log.performedBy}</TableCell>
                <TableCell>{log.dateTime}</TableCell>
                <TableCell>${log.price.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Update</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </LogsLayout>
  )
}

