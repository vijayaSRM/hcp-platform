import { useState } from 'react';
import { Plus, Send, X } from 'lucide-react';

// Profile images for representatives
const PROFILE_IMAGES = {
  representatives: {
    "Dr. Sarah Chen": "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
    "Dr. Priya Sharma": "https://img.freepik.com/free-photo/young-female-doctor-posing-hospital_1303-21213.jpg",
    "Dr. Michael Roberts": "https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg",
    "Dr. James Wilson": "https://img.freepik.com/free-photo/doctor-with-white-robe-stethoscope_144627-43879.jpg",
    "Dr. Emily Johnson": "https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827775.jpg"
  }
};

const Messaging = ({ selectedChat, setSelectedChat }) => {
  const [newChatModal, setNewChatModal] = useState(false);
  const [searchRep, setSearchRep] = useState("");
  const [message, setMessage] = useState("");

  // Mock data
  const mockReps = [
    { id: 1, name: "Dr. Sarah Chen", specialty: "Cardiology", availability: "Online" },
    { id: 2, name: "Dr. Michael Roberts", specialty: "Neurology", availability: "Away" },
    { id: 3, name: "Dr. Priya Sharma", specialty: "Immunology", availability: "Online" },
    { id: 4, name: "Dr. James Wilson", specialty: "Gastroenterology", availability: "Busy" },
    { id: 5, name: "Dr. Emily Johnson", specialty: "Endocrinology", availability: "Online" }
  ];

  const [localChats, setLocalChats] = useState([
    { 
      repId: 1, 
      messages: [
        { sender: "rep", text: "Hello Dr. Taylor, I hope you're doing well. How can I assist you with Cardiozen today?", time: "10:30 AM" },
        { sender: "user", text: "Hi Dr. Chen, I have a patient with resistant hypertension. Would Cardiozen be appropriate as an add-on therapy?", time: "10:32 AM" },
        { sender: "rep", text: "Absolutely, Cardiozen has shown efficacy as an add-on therapy in the PATHWAY-2 trial. Would you like me to send you the study results?", time: "10:33 AM" }
      ]
    },
    {
      repId: 3,
      messages: [
        { sender: "rep", text: "Good afternoon Dr. Taylor. Any questions about our new Immunoboost dosing guidelines?", time: "Yesterday" },
        { sender: "user", text: "Yes, I'm concerned about the infection risk in elderly patients.", time: "Yesterday" },
        { sender: "rep", text: "That's a valid concern. Our recent subgroup analysis in patients over 65 showed...", time: "Yesterday" }
      ]
    }
  ]);

  // Filter representatives based on search
  const filteredReps = mockReps.filter(rep => 
    !localChats.find(chat => chat.repId === rep.id) &&
    (rep.name.toLowerCase().includes(searchRep.toLowerCase()) ||
     rep.specialty.toLowerCase().includes(searchRep.toLowerCase()))
  );

  const startNewChat = (rep) => {
    const newChat = {
      repId: rep.id,
      messages: []
    };
    setLocalChats([...localChats, newChat]);
    setSelectedChat(newChat);
    setNewChatModal(false);
    setSearchRep("");
  };

  const sendMessage = () => {
    if (message.trim() && selectedChat) {
      const updatedChats = localChats.map(chat => {
        if (chat.repId === selectedChat.repId) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              { sender: "user", text: message.trim(), time: new Date().toLocaleTimeString() }
            ]
          };
        }
        return chat;
      });
      setLocalChats(updatedChats);
      setMessage("");

      // Simulate rep response after 1 second
      setTimeout(() => {
        const autoResponse = {
          sender: "rep",
          text: "Thank you for your message. I'll review and respond shortly.",
          time: new Date().toLocaleTimeString()
        };
        setLocalChats(chats => 
          chats.map(chat => 
            chat.repId === selectedChat.repId
              ? { ...chat, messages: [...chat.messages, autoResponse] }
              : chat
          )
        );
      }, 1000);
    }
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Secure Messaging</h2>
        <button
          onClick={() => setNewChatModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 h-[calc(100vh-200px)]">
        {/* Chat List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full p-2 border rounded-lg"
              onChange={(e) => setSearchRep(e.target.value)}
            />
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {localChats.map((chat) => {
              const rep = mockReps.find(r => r.id === chat.repId);
              const lastMessage = chat.messages[chat.messages.length - 1];
              return (
                <div
                  key={chat.repId}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                    selectedChat?.repId === chat.repId ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={PROFILE_IMAGES.representatives[rep.name]}
                        alt={rep.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{rep.name}</div>
                      <div className="text-sm text-gray-500">{rep.specialty}</div>
                    </div>
                  </div>
                  {lastMessage && (
                    <div className="mt-2 text-sm text-gray-600 truncate">
                      {lastMessage.text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Window */}
        <div className="col-span-2 bg-white rounded-lg shadow overflow-hidden">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-blue-50">
                {(() => {
                  const rep = mockReps.find(r => r.id === selectedChat.repId);
                  return (
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold">{rep.name}</h3>
                        <p className="text-sm text-gray-600">{rep.specialty}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        rep.availability === 'Online' ? 'bg-green-100 text-green-800' :
                        rep.availability === 'Away' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {rep.availability}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Messages */}
              <div className="h-[calc(100%-8rem)] overflow-y-auto p-4">
                {selectedChat.messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] rounded-lg p-3 ${
                      msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}>
                      <div className="text-sm">{msg.text}</div>
                      <div className={`text-xs mt-1 ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white p-3 rounded-r hover:bg-blue-600"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a conversation or start a new chat
            </div>
          )}
        </div>
      </div>

      {/* New Chat Modal */}
      {newChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">New Conversation</h3>
              <button
                onClick={() => setNewChatModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Search medical representatives..."
              value={searchRep}
              onChange={(e) => setSearchRep(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            
            <div className="max-h-64 overflow-y-auto">
              {filteredReps.map((rep) => (
                <div
                  key={rep.id}
                  className="p-3 hover:bg-gray-50 cursor-pointer rounded"
                  onClick={() => startNewChat(rep)}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={PROFILE_IMAGES.representatives[rep.name]}
                        alt={rep.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{rep.name}</div>
                      <div className="text-sm text-gray-500">{rep.specialty}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messaging; 