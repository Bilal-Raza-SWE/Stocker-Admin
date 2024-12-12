"use client"

import { useState } from 'react'
import { Download, FileSpreadsheet, FileText, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const reportTypes = [
  {
    id: 'sales',
    title: 'Sales Report',
    description: 'Detailed analysis of sales performance and revenue metrics',
    metrics: ['Revenue', 'Units Sold', 'Average Order Value', 'Top Products']
  },
  {
    id: 'inventory',
    title: 'Inventory Report',
    description: 'Stock levels, movement patterns, and inventory health metrics',
    metrics: ['Stock Levels', 'Turnover Rate', 'Low Stock Items', 'Dead Stock']
  },
  {
    id: 'performance',
    title: 'Performance Report',
    description: 'Key performance indicators and business metrics',
    metrics: ['Conversion Rate', 'Growth Rate', 'Customer Satisfaction', 'ROI']
  }
]

export default function ReportsGenerator() {
  const [date, setDate] = useState(new Date())
  const [selectedReport, setSelectedReport] = useState('')
  const [selectedMetrics, setSelectedMetrics] = useState({})
  const [exportFormat, setExportFormat] = useState('pdf')

  const handleMetricToggle = (reportId, metric) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [reportId]: {
        ...(prev[reportId] || {}),
        [metric]: !(prev[reportId]?.[metric])
      }
    }))
  }

  return (
    <div className="p-6 space-y-8">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-sm text-muted-foreground mb-2">Analytics / Generate Reports</h1>
          <div className="flex items-center gap-4">
            
            <Button variant="outline" onClick={() => window.location.href='/analytics'}>Show Analytics</Button>
            <Button>
              Generate Reports
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Generate Reports</h1>
        <div className="flex items-center gap-4">
          <DatePicker date={date} setDate={setDate} />
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Export Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF Document</SelectItem>
              <SelectItem value="excel">Excel Spreadsheet</SelectItem>
              <SelectItem value="csv">CSV File</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reportTypes.map((report) => (
          <Card key={report.id} className={`cursor-pointer transition-colors ${
            selectedReport === report.id ? 'border-primary' : ''
          }`} onClick={() => setSelectedReport(report.id)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {report.id === 'sales' && <FileText className="h-5 w-5" />}
                {report.id === 'inventory' && <Filter className="h-5 w-5" />}
                {report.id === 'performance' && <FileSpreadsheet className="h-5 w-5" />}
                {report.title}
              </CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Select Metrics:</h4>
                {report.metrics.map((metric) => (
                  <div key={metric} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${report.id}-${metric}`}
                      checked={selectedMetrics[report.id]?.[metric]}
                      onCheckedChange={() => handleMetricToggle(report.id, metric)}
                    />
                    <label
                      htmlFor={`${report.id}-${metric}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {metric}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

