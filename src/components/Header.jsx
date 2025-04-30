import { LogOut } from 'lucide-react';

const fallbackAvatar = 'https://ui-avatars.com/api/?name=Alex+Taylor&background=0D8ABC&color=fff';

const Header = ({ user, handleLogout }) => {
  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-blue-800">HCP Engagement Platform</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-500">{user.specialty}</div>
        </div>
        <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-blue-500">
          <img 
            src={user.profileImage} 
            alt="Profile" 
            className="h-full w-full object-cover"
            onError={e => { e.target.onerror = null; e.target.src = fallbackAvatar; }}
          />
        </div>
        <button 
          onClick={handleLogout}
          className="text-gray-700 hover:text-red-600"
          aria-label="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Header; 