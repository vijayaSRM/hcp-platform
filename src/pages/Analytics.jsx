import { useState } from 'react';
import { Video, Users, FileText, Bell, Clock } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  const mockData = {
    consultations: {
      total: 24,
      completed: 20,
      cancelled: 4,
      trend: '+15%'
    },
    drugQueries: {
      total: 156,
      byDrug: {
        Cardiozen: 45,
        Neurolex: 38,
        Immunoboost: 35,
        Gastroprotect: 22,
        Glucobalance: 16
      }
    },
    interactions: {
      totalTime: '45.5 hours',
      avgDuration: '28 minutes',
      satisfaction: '4.8/5'
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Consultations</h3>
            <span className="text-green-500 text-sm">{mockData.consultations.trend}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total</span>
              <span className="font-medium">{mockData.consultations.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Completed</span>
              <span className="text-green-500">{mockData.consultations.completed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cancelled</span>
              <span className="text-red-500">{mockData.consultations.cancelled}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Drug Queries</h3>
          <div className="space-y-2">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Total Queries</span>
              <span className="font-medium">{mockData.drugQueries.total}</span>
            </div>
            {Object.entries(mockData.drugQueries.byDrug).map(([drug, count]) => (
              <div key={drug} className="flex justify-between">
                <span className="text-gray-600">{drug}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Interaction Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Time</span>
              <span className="font-medium">{mockData.interactions.totalTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Duration</span>
              <span className="font-medium">{mockData.interactions.avgDuration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Satisfaction</span>
              <span className="font-medium">{mockData.interactions.satisfaction}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500 mt-1"></div>
            <div className="ml-4">
              <p className="font-medium">Video Consultation with Dr. Sarah Chen</p>
              <p className="text-sm text-gray-500">Today at 10:00 AM - Cardiozen Clinical Trial Review</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-500 mt-1"></div>
            <div className="ml-4">
              <p className="font-medium">Drug Information Query</p>
              <p className="text-sm text-gray-500">Yesterday - Neurolex Dosing Guidelines</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-500 mt-1"></div>
            <div className="ml-4">
              <p className="font-medium">Resource Download</p>
              <p className="text-sm text-gray-500">2 days ago - Immunoboost Safety Profile PDF</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 