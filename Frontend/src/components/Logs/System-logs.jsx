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
const systemLogs = [
  {
    id: 1,
    ipAddress: '192.168',
    source: 'Database',
    type: 'Warning',
    message: 'Page not found.',
    performedBy: 'Bilal Raza',
    dateTime: '25/09/2024',
    severity: 'Medium'
  },
  // Add more logs as needed
]

export default function SystemLogs() {
  const [filters, setFilters] = useState({
    severity: '',
    user: '',
    type: '',
    date: ''
  })

  return (
    <LogsLayout title="System Logs">
      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 max-w-xs">
          <Select
            value={filters.severity}
            onValueChange={(value) => setFilters({...filters, severity: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          placeholder="User"
          value={filters.user}
          onChange={(e) => setFilters({...filters, user: e.target.value})}
          className="max-w-[200px]"
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
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
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
              <TableHead>IP Address</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Performed By</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {systemLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.ipAddress}</TableCell>
                <TableCell>{log.source}</TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs",
                    {
                      'bg-red-100 text-red-800': log.type === 'Error',
                      'bg-yellow-100 text-yellow-800': log.type === 'Warning',
                      'bg-blue-100 text-blue-800': log.type === 'Info'
                    }
                  )}>
                    {log.type}
                  </span>
                </TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>{log.performedBy}</TableCell>
                <TableCell>{log.dateTime}</TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs",
                    {
                      'bg-red-100 text-red-800': log.severity === 'High',
                      'bg-yellow-100 text-yellow-800': log.severity === 'Medium',
                      'bg-green-100 text-green-800': log.severity === 'Low'
                    }
                  )}>
                    {log.severity}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
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

