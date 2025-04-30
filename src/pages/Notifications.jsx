import { useState } from 'react';
import { Bell, Search, CheckCircle, Pill, Calendar, FileText, AlertCircle } from 'lucide-react';

const Notifications = ({ notifications, markAsRead }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const notificationTypes = {
    'drug-update': { icon: Pill, color: 'blue' },
    'meeting': { icon: Calendar, color: 'purple' },
    'content': { icon: FileText, color: 'green' },
    'alert': { icon: AlertCircle, color: 'red' }
  };

  const mockNotifications = [
    {
      id: 1,
      type: 'drug-update',
      title: "New Drug Launch - Cardiozen XR",
      message: "Cardiozen XR (extended release) is now available for prescription. Updated dosing guidelines and safety information available.",
      date: "2024-05-10",
      time: "09:30 AM",
      isRead: false,
      priority: "high"
    },
    {
      id: 2,
      type: 'meeting',
      title: "Upcoming Video Consultation",
      message: "Scheduled consultation with Dr. Sarah Chen regarding Cardiozen clinical trials.",
      date: "2024-05-11",
      time: "02:00 PM",
      isRead: false,
      priority: "medium"
    },
    {
      id: 3,
      type: 'content',
      title: "New Clinical Study Published",
      message: "Latest research on Immunoboost efficacy in autoimmune conditions now available in the content library.",
      date: "2024-05-09",
      time: "11:15 AM",
      isRead: true,
      priority: "medium"
    },
    {
      id: 4,
      type: 'alert',
      title: "Important Safety Update",
      message: "Revised contraindications for Neurolex. Please review updated prescribing information.",
      date: "2024-05-08",
      time: "03:45 PM",
      isRead: true,
      priority: "high"
    }
  ];

  const filteredNotifications = mockNotifications
    .filter(notif => {
      if (filter === 'unread') return !notif.isRead;
      if (filter === 'read') return notif.isRead;
      return true;
    })
    .filter(notif =>
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notifications</h2>
        <button
          onClick={markAsRead}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Filters and Search */}
        <div className="p-4 border-b flex flex-wrap gap-4 items-center">
          <div className="flex space-x-2">
            {['all', 'unread', 'read'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === filterType
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="divide-y">
          {filteredNotifications.map((notif) => {
            const Icon = notificationTypes[notif.type].icon;
            const color = notificationTypes[notif.type].color;
            return (
              <div
                key={notif.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notif.isRead ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-full bg-${color}-100 mr-4`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        notif.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {notif.priority.charAt(0).toUpperCase() + notif.priority.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{notif.message}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {notif.date} at {notif.time}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notifications; 