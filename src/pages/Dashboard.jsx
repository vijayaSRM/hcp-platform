import { useState } from 'react';
import { Search, MessageSquare, Calendar, BookOpen, Video, Users, FileText, Bell, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setActiveTab }) => {
  const navigate = useNavigate();

  // Mock appointments data
  const mockAppointments = [
    { 
      id: 1, 
      rep: "Dr. Sarah Chen", 
      topic: "Cardiozen Clinical Trial Review",
      date: "2024-05-15",
      time: "10:00 AM",
      duration: 30
    },
    { 
      id: 2, 
      rep: "Dr. Priya Sharma", 
      topic: "Immunoboost Safety Profile",
      date: "2024-05-16",
      time: "2:30 PM",
      duration: 45
    }
  ];

  // Quick action cards with icons and colors
  const quickActions = [
    { 
      id: "search", 
      icon: Search, 
      label: "Search Drugs", 
      color: "bg-blue-500",
      description: "Find detailed drug information",
      path: "/search"
    },
    { 
      id: "message", 
      icon: MessageSquare, 
      label: "Message Rep", 
      color: "bg-green-500",
      description: "Connect with your representatives",
      path: "/messaging"
    },
    { 
      id: "schedule", 
      icon: Calendar, 
      label: "Schedule Meeting", 
      color: "bg-purple-500",
      description: "Book video consultations",
      path: "/scheduler"
    },
    { 
      id: "resources", 
      icon: BookOpen, 
      label: "Resources", 
      color: "bg-amber-500",
      description: "Access clinical materials",
      path: "/content"
    }
  ];

  // Recent activity data with icons
  const recentActivity = [
    {
      id: 1,
      type: "consultation",
      icon: Video,
      title: "Video Consultation",
      description: "Meeting with Dr. Sarah Chen",
      time: "Today at 10:00 AM",
      status: "Upcoming",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: 2,
      type: "drug",
      icon: Search,
      title: "Drug Information",
      description: "Accessed Cardiozen clinical data",
      time: "Yesterday",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 3,
      type: "message",
      icon: MessageSquare,
      title: "New Message",
      description: "Response from Dr. Priya Sharma",
      time: "2 hours ago",
      status: "Unread",
      statusColor: "bg-blue-100 text-blue-800"
    }
  ];

  // Key metrics with icons
  const metrics = [
    {
      id: 1,
      icon: Video,
      label: "Consultations",
      value: "12",
      trend: "+20%",
      trendUp: true,
      color: "text-purple-500"
    },
    {
      id: 2,
      icon: Users,
      label: "Active Reps",
      value: "5",
      trend: "Active",
      trendUp: true,
      color: "text-blue-500"
    },
    {
      id: 3,
      icon: FileText,
      label: "Resources",
      value: "45",
      trend: "Updated",
      trendUp: true,
      color: "text-green-500"
    },
    {
      id: 4,
      icon: Bell,
      label: "Notifications",
      value: "3",
      trend: "New",
      trendUp: true,
      color: "text-amber-500"
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      {/* Header with welcome message and profile */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome back, Dr. Taylor</h2>
          <p className="text-gray-600 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => handleNavigation('/notifications')}
            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
          >
            <Bell className="w-4 h-4 mr-2" />
            <span className="font-medium">3 Updates</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${metric.color} bg-opacity-10`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                metric.trendUp ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {metric.trend}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
            <p className="text-gray-600">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleNavigation(action.path)}
            className={`${action.color} text-white p-6 rounded-lg flex flex-col items-center justify-center hover:opacity-90 transition-opacity`}
            aria-label={action.label}
          >
            <div className="bg-white bg-opacity-20 p-3 rounded-full mb-3">
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-lg font-semibold mb-1">{action.label}</span>
            <span className="text-sm opacity-90">{action.description}</span>
          </button>
        ))}
      </div>

      {/* Recent Activity and Upcoming Meetings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Recent Activity
            </h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className={`p-2 rounded-full mr-3 ${activity.type === 'consultation' ? 'bg-purple-100' : 
                  activity.type === 'drug' ? 'bg-blue-100' : 'bg-green-100'}`}>
                  <activity.icon className={`w-5 h-5 ${activity.type === 'consultation' ? 'text-purple-600' :
                    activity.type === 'drug' ? 'text-blue-600' : 'text-green-600'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{activity.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${activity.statusColor}`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                  <p className="text-gray-500 text-xs mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-500" />
              Upcoming Meetings
            </h3>
            <button 
              onClick={() => handleNavigation('/scheduler')}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
            >
              Schedule Meeting
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {mockAppointments.map((appt) => (
              <div key={appt.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <Video className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{appt.topic}</h4>
                      <p className="text-sm text-gray-600">with {appt.rep}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleNavigation('/video')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Video className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{appt.date} at {appt.time} ({appt.duration} min)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 