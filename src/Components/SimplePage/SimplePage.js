import React, { useState } from "react";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  BookOpen,
  TrendingUp,
  Star,
  Clock,
  Heart,
  Award,
  Zap,
  Calendar,
} from "lucide-react";

const readingData = [
  { month: "Jan", booksRead: 3, pagesRead: 1240 },
  { month: "Feb", booksRead: 5, pagesRead: 2100 },
  { month: "Mar", booksRead: 4, pagesRead: 1890 },
  { month: "Apr", booksRead: 6, pagesRead: 2540 },
  { month: "May", booksRead: 7, pagesRead: 2890 },
  { month: "Jun", booksRead: 5, pagesRead: 2340 },
  { month: "Jul", booksRead: 8, pagesRead: 3120 },
];

const genreData = [
  { name: "Fiction", value: 85 },
  { name: "Mystery", value: 72 },
  { name: "Sci-Fi", value: 88 },
  { name: "Fantasy", value: 92 },
  { name: "Romance", value: 65 },
  { name: "Non-Fiction", value: 78 },
];

const trendingBooks = [
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    rating: 4.8,
    reads: 15420,
    genre: "Mystery",
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    rating: 4.7,
    reads: 12890,
    genre: "Sci-Fi",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.9,
    reads: 18750,
    genre: "Non-Fiction",
  },
  {
    id: 4,
    title: "Project Hail Mary",
    author: "Andy Weir",
    rating: 4.8,
    reads: 14320,
    genre: "Sci-Fi",
  },
  {
    id: 5,
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.6,
    reads: 11200,
    genre: "Fantasy",
  },
];

const SimplePage = () => {
  const [activeGenre, setActiveGenre] = useState("All");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-2">
          📚 Your Reading Journey
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's your reading dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="shadow-md border-none hover:shadow-lg transition-all hover:scale-105">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Books Read</p>
              <h2 className="text-3xl font-bold">38</h2>
              <p className="text-xs text-green-600 mt-1">+3 this month</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-xl">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-none hover:shadow-lg transition-all hover:scale-105">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pages Read</p>
              <h2 className="text-3xl font-bold">16.1K</h2>
              <p className="text-xs text-green-600 mt-1">+2,120 this month</p>
            </div>
            <div className="bg-green-100 p-4 rounded-xl">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-none hover:shadow-lg transition-all hover:scale-105">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Wishlist Items</p>
              <h2 className="text-3xl font-bold">24</h2>
              <p className="text-xs text-blue-600 mt-1">4 new this week</p>
            </div>
            <div className="bg-pink-100 p-4 rounded-xl">
              <Heart className="w-8 h-8 text-pink-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-none hover:shadow-lg transition-all hover:scale-105">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Reading Streak</p>
              <h2 className="text-3xl font-bold">28</h2>
              <p className="text-xs text-orange-600 mt-1">days in a row</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-xl">
              <Award className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="shadow-md border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              Reading Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={readingData}>
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="booksRead"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={{ fill: "#6366F1", r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Books Read"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Pages by Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={readingData}>
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="pagesRead"
                  fill="#a78bfa"
                  radius={[8, 8, 0, 0]}
                  name="Pages Read"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Genre Radar and Trending Books */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Genre Preferences */}
        <Card className="shadow-md border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              Favorite Genres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={genreData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="name" stroke="#6b7280" />
                <PolarRadiusAxis
                  stroke="#9ca3af"
                  angle={90}
                  domain={[0, 100]}
                />
                <Radar
                  name="Reading Preference"
                  dataKey="value"
                  stroke="#ec4899"
                  fill="#ec4899"
                  fillOpacity={0.6}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trending Books */}
        <Card className="shadow-md border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-pink-600" />
              Trending This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trendingBooks.map((book, index) => (
                <div
                  key={book.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer border border-transparent hover:border-indigo-200"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {book.title}
                    </p>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {book.reads.toLocaleString()} reads • {book.genre}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">
                      {book.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Reading */}
      <Card className="shadow-md border-none mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-600" />
            Currently Reading
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Project Hail Mary",
                author: "Andy Weir",
                progress: 68,
                pagesLeft: 187,
                daysToFinish: 12,
              },
              {
                title: "The Midnight Library",
                author: "Matt Haig",
                progress: 42,
                pagesLeft: 298,
                daysToFinish: 21,
              },
            ].map((book, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100"
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{book.author}</p>
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{book.progress}% Complete</span>
                    <span>{book.pagesLeft} pages left</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full transition-all duration-500"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-indigo-600 font-medium">
                  Finish in ~{book.daysToFinish} days
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimplePage;
