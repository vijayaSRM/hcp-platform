import { useState } from 'react';
import { Plus, Video, MoreVertical, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';

const Scheduler = () => {
  const [view, setView] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);

  const mockAppointments = [
    {
      id: 1,
      title: "Cardiozen Clinical Trial Review",
      rep: "Dr. Sarah Chen",
      type: "Video Consultation",
      date: "2024-05-15",
      time: "10:00 AM",
      duration: 30,
      status: "confirmed"
    },
    {
      id: 2,
      title: "Neurolex Safety Profile Discussion",
      rep: "Dr. Michael Roberts",
      type: "Video Consultation",
      date: "2024-05-15",
      time: "2:30 PM",
      duration: 45,
      status: "pending"
    },
    {
      id: 3,
      title: "Immunoboost Update Meeting",
      rep: "Dr. Priya Sharma",
      type: "Video Consultation",
      date: "2024-05-16",
      time: "11:00 AM",
      duration: 30,
      status: "confirmed"
    }
  ];

  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9; // 9 AM to 5 PM
    return `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Scheduler</h2>
        <button
          onClick={() => setShowNewMeetingModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Meeting
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Calendar Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold">May 2024</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex space-x-2">
            {['day', 'week', 'month'].map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  view === viewType
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-8 gap-4 p-4">
          {/* Time slots column */}
          <div className="space-y-6 pt-6">
            {timeSlots.map((time) => (
              <div key={time} className="text-sm text-gray-500">{time}</div>
            ))}
          </div>

          {/* Days columns */}
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="border-l">
              <div className="text-center pb-4">
                <div className="font-medium">
                  {new Date(2024, 4, 15 + i).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-lg">
                  {new Date(2024, 4, 15 + i).getDate()}
                </div>
              </div>
              
              {/* Appointments */}
              <div className="relative h-full">
                {mockAppointments
                  .filter(apt => apt.date === `2024-05-${15 + i}`)
                  .map((apt) => (
                    <div
                      key={apt.id}
                      className={`absolute w-full p-2 rounded-lg text-sm ${
                        apt.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                      style={{
                        top: `${(parseInt(apt.time) - 9) * 60}px`,
                        height: `${apt.duration}px`
                      }}
                    >
                      <div className="font-medium">{apt.title}</div>
                      <div className="text-xs">{apt.time} ({apt.duration} min)</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Upcoming Meetings</h3>
        <div className="space-y-4">
          {mockAppointments.map((apt) => (
            <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{apt.title}</h4>
                <p className="text-sm text-gray-600">
                  {apt.date} at {apt.time} ({apt.duration} min)
                </p>
                <p className="text-sm text-gray-500">with {apt.rep}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scheduler; 