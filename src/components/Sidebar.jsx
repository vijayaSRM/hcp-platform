import { Home, Search, MessageCircle, Mail, Video, Bell, Library, Calendar, MessageSquare, BarChart2, Shield, Activity, ShieldCheck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab, unreadNotifications }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", path: "/" },
    { id: "search", icon: Search, label: "Drug Information", path: "/search" },
    { id: "chatbot", icon: MessageCircle, label: "AI Chatbot", path: "/chatbot" },
    { id: "messaging", icon: Mail, label: "Messaging", path: "/messaging" },
    { id: "video", icon: Video, label: "Video Consult", path: "/video" },
    { id: "notifications", icon: Bell, label: "Notifications", path: "/notifications", badge: unreadNotifications },
    { id: "content", icon: Library, label: "Content Library", path: "/content" },
    { id: "scheduler", icon: Calendar, label: "Scheduler", path: "/scheduler" },
    { id: "feedback", icon: MessageSquare, label: "Feedback", path: "/feedback" },
    { id: "analytics", icon: BarChart2, label: "Analytics", path: "/analytics" },
    { id: "compliance", icon: Shield, label: "Compliance", path: "/compliance" },
  ];

  const handleNavigation = (item) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col">
      <div className="p-4 border-b border-blue-700 flex items-center">
        <div className="w-6 h-6 mr-2">
          <Activity className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold">HCP Platform</h2>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors
                    ${isActive
                      ? "bg-white text-blue-800 font-semibold shadow"
                      : "bg-blue-800 text-white hover:bg-blue-700"}
                  `}
                  aria-label={item.label}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${isActive ? "text-blue-800" : "text-white"}`} />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 text-sm text-blue-200 flex items-center">
        <ShieldCheck className="w-4 h-4 mr-2" />
        <div>
          <p>© 2025 HCP Platform</p>
          <p>Compliance certified</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 