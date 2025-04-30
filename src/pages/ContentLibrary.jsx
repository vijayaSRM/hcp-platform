import { useState } from 'react';
import { Library, Bookmark, Filter, Search, FileText, PlayCircle, Newspaper, Edit3, Calendar, User } from 'lucide-react';

const ContentLibrary = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Category definitions with icons
  const categories = [
    { id: 'all', label: 'All Content', icon: Library },
    { id: 'clinical', label: 'Clinical Studies', icon: FileText },
    { id: 'guidelines', label: 'Guidelines', icon: Bookmark },
    { id: 'videos', label: 'Videos', icon: PlayCircle },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'blogs', label: 'Blogs', icon: Edit3 }
  ];

  const mockContent = [
    {
      id: 1,
      type: 'clinical',
      title: "Cardiozen Efficacy Study",
      description: "A comprehensive analysis of Cardiozen's effectiveness in treating resistant hypertension.",
      format: "PDF",
      date: "2024-05-01",
      author: "Dr. Sarah Chen",
      category: "Clinical Studies",
      icon: FileText,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800'
    },
    {
      id: 2,
      type: 'videos',
      title: "Understanding Neurolex Mechanism of Action",
      description: "An animated explanation of how Neurolex works in treating epilepsy.",
      format: "Video",
      duration: "15:30",
      date: "2024-04-28",
      author: "Medical Animation Team",
      category: "Educational",
      icon: PlayCircle,
      bgColor: 'bg-red-100',
      textColor: 'text-red-800'
    },
    {
      id: 3,
      type: 'news',
      title: "Immunoboost Receives Regulatory Approval",
      description: "Breaking news about Immunoboost's approval for new indications.",
      format: "Article",
      date: "2024-05-05",
      author: "Healthcare News Network",
      category: "News",
      icon: Newspaper,
      bgColor: 'bg-green-100',
      textColor: 'text-green-800'
    },
    {
      id: 4,
      type: 'blogs',
      title: "Best Practices in Prescribing Gastroprotect",
      description: "Expert insights on optimizing Gastroprotect therapy in clinical practice.",
      format: "Blog Post",
      date: "2024-05-03",
      author: "Dr. James Wilson",
      category: "Clinical Insights",
      icon: Edit3,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800'
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Library className="w-8 h-8 mr-3 text-blue-600" />
          <h2 className="text-2xl font-bold">Content Library</h2>
        </div>
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center">
            <Bookmark className="w-4 h-4 mr-2" />
            Saved Items
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center ${
                    activeTab === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockContent.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center px-3 py-2 rounded-lg ${item.bgColor} ${item.textColor}`}>
                    <Icon className="w-5 h-5 mr-2" />
                    <span className="font-medium">{item.format}</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>{item.author}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentLibrary; 