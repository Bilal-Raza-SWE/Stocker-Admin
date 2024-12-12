"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import {
  ArrowDown,
  ArrowUp,
  Download,
  Calendar,
  BarChart3,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data
const leadData = [
  { name: "FY 2020-W27", value: 500, trend: 520, anomaly: 510 },
  { name: "FY 2020-W28", value: 600, trend: 580, anomaly: 620 },
  { name: "FY 2020-W29", value: 550, trend: 600, anomaly: 590 },
  { name: "FY 2020-W30", value: 700, trend: 650, anomaly: 680 },
  { name: "FY 2020-W31", value: 650, trend: 670, anomaly: 700 },
  { name: "FY 2020-W32", value: 800, trend: 750, anomaly: 780 },
  { name: "FY 2020-W33", value: 750, trend: 800, anomaly: 850 },
];

const funnelData = [
  { name: "Needs Analysis", value: 1000, fill: "#22c55e" },
  { name: "Value Proposition", value: 800, fill: "#3b82f6" },
  { name: "Negotiation/Review", value: 600, fill: "#a855f7" },
  { name: "Closed Won", value: 400, fill: "#ec4899" },
  { name: "Closed Lost", value: 200, fill: "#ef4444" },
];

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div className="p-6 space-y-2">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-sm text-muted-foreground mb-2">Analytics / Show analytics</h1>
          <div className="flex items-center gap-4">
            
            <Button>Show Analytics</Button>
            <Button variant="outline" onClick={() => window.location.href='/analytics/reports'}>
              Generate Reports
            </Button>
          </div>
        </div>
      </div>




      <div className="flex justify-between items-center">





        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Show Analytics</h1>
        </div>

        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Reports
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Customize
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Deals Created This Month
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">314,392</div>
            <p className="text-xs text-muted-foreground">Last Month: 532,540</p>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <ArrowUp className="h-4 w-4" />
              <span>48% increase</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue This Month
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,072,928.79</div>
            <p className="text-xs text-muted-foreground">
              Last Month: ₹2,297,938.79
            </p>
            <div className="flex items-center space-x-2 text-sm text-red-600">
              <ArrowDown className="h-4 w-4" />
              <span>9.9% decrease</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Deals Closing This Month
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18,231</div>
            <p className="text-xs text-muted-foreground">Last Month: 10,851</p>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <ArrowUp className="h-4 w-4" />
              <span>68% increase</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Over Due Activities
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">242,223</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Anomaly in Lead Creation This Quarter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={leadData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    name="Record Count"
                  />
                  <Line
                    type="monotone"
                    dataKey="trend"
                    stroke="#22c55e"
                    name="Trend"
                  />
                  <Line
                    type="monotone"
                    dataKey="anomaly"
                    stroke="#f59e0b"
                    name="Anomaly"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Pipeline by Stages - This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <FunnelChart>
                  <Tooltip />
                  <Funnel dataKey="value" data={funnelData} isAnimationActive>
                    <LabelList
                      position="right"
                      fill="#888"
                      stroke="none"
                      dataKey="name"
                    />
                  </Funnel>
                </FunnelChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
