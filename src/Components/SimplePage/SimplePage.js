import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import { Button } from "./Button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Activity, TrendingUp, Users, ShoppingBag } from "lucide-react";
import { downloadReport } from "./downloadReport";

const data = [
  { name: "Jan", sales: 4000, users: 2400 },
  { name: "Feb", sales: 3000, users: 1398 },
  { name: "Mar", sales: 2000, users: 9800 },
  { name: "Apr", sales: 2780, users: 3908 },
  { name: "May", sales: 1890, users: 4800 },
  { name: "Jun", sales: 2390, users: 3800 },
  { name: "Jul", sales: 3490, users: 4300 },
];

const reportData = [
  { name: "Jan", sales: 4000, users: 2400 },
  { name: "Feb", sales: 3000, users: 1398 },
  { name: "Mar", sales: 2000, users: 9800 },
  { name: "Apr", sales: 2780, users: 3908 },
  { name: "May", sales: 1890, users: 4800 },
  { name: "Jun", sales: 2390, users: 3800 },
  { name: "Jul", sales: 3490, users: 4300 },
];

const SimplePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => downloadReport(reportData, "pdf", "SalesReport")}
        >
          Download Report
        </Button>
        {/* <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => downloadReport(reportData, "pdf", "SalesReport")}
        >
          Download Report
        </Button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="shadow-sm border-none hover:shadow-md transition">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Users</p>
              <h2 className="text-2xl font-bold">12,340</h2>
            </div>
            <div className="bg-indigo-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none hover:shadow-md transition">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Sales</p>
              <h2 className="text-2xl font-bold">$58,420</h2>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none hover:shadow-md transition">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Growth</p>
              <h2 className="text-2xl font-bold">+12.4%</h2>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none hover:shadow-md transition">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Performance</p>
              <h2 className="text-2xl font-bold">92%</h2>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-none">
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Bar dataKey="users" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimplePage;
