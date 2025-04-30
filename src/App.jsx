import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import SearchDrugs from './pages/SearchDrugs'
import Chatbot from './pages/Chatbot'
import Messaging from './pages/Messaging'
import VideoConsultation from './pages/VideoConsultation'
import Notifications from './pages/Notifications'
import ContentLibrary from './pages/ContentLibrary'
import Scheduler from './pages/Scheduler'
import FeedbackForm from './pages/FeedbackForm'
import Analytics from './pages/Analytics'
import Compliance from './pages/Compliance'
import LoginPage from './pages/LoginPage'
import './App.css'

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedDrug, setSelectedDrug] = useState(null)
  const [selectedChat, setSelectedChat] = useState(null)
  const [selectedRep, setSelectedRep] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const navigate = useNavigate()

  const handleLogin = (credentials) => {
    if (credentials.email && credentials.password && credentials.mfaCode) {
      setUser({ 
        name: "Dr. Alex Taylor", 
        email: credentials.email, 
        role: "HCP", 
        specialty: "Internal Medicine",
        profileImage: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg"
      })
      setIsAuthenticated(true)
      navigate('/')
    }
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setActiveTab("dashboard")
    navigate('/login')
  }

  const markNotificationsAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })))
    setUnreadNotifications(0)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <Routes>
      <Route path="/login" element={
        !isAuthenticated ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <Navigate to="/" replace />
        )
      } />
      
      <Route path="/*" element={
        isAuthenticated ? (
          <div className="flex h-screen bg-gray-100">
            <Sidebar 
              activeTab={activeTab}
              setActiveTab={handleTabChange} 
              unreadNotifications={unreadNotifications}
            />
            <div className="flex-1 flex flex-col">
              <Header user={user} handleLogout={handleLogout} />
              <div className="flex-1 p-6 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Dashboard setActiveTab={handleTabChange} />} />
                  <Route path="/search" element={<SearchDrugs selectedDrug={selectedDrug} setSelectedDrug={setSelectedDrug} />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="/messaging" element={<Messaging selectedChat={selectedChat} setSelectedChat={setSelectedChat} />} />
                  <Route path="/video" element={<VideoConsultation selectedRep={selectedRep} />} />
                  <Route path="/notifications" element={<Notifications notifications={notifications} markAsRead={markNotificationsAsRead} />} />
                  <Route path="/content" element={<ContentLibrary />} />
                  <Route path="/scheduler" element={<Scheduler />} />
                  <Route path="/feedback" element={<FeedbackForm />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/compliance" element={<Compliance />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <Navigate to="/login" replace />
        )
      } />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
