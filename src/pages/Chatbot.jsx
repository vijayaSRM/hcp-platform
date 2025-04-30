import { useState } from 'react';
import { Bot, Send } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "Hello! I'm your AI medical assistant. I can help you with drug information, dosage guidelines, and general medical queries. How can I assist you today?" 
    },
    {
      sender: "user",
      text: "What are the common side effects of Cardiozen?"
    },
    {
      sender: "bot",
      text: "Based on clinical data, the common side effects of Cardiozen include:\n\n• Dizziness (reported in 8-12% of patients)\n• Dry cough (5-7% of patients)\n• Mild headache (4-6% of patients)\n• Fatigue (3-5% of patients)\n\nMost side effects are mild and typically resolve within 2-3 weeks of treatment. If you experience severe or persistent side effects, please consult your healthcare provider."
    },
    {
      sender: "user",
      text: "Can Cardiozen be taken with Glucobalance?"
    },
    {
      sender: "bot",
      text: "Yes, Cardiozen can generally be co-administered with Glucobalance. However, please note:\n\n1. Monitor blood pressure more frequently initially\n2. Take medications at different times (2 hours apart) for optimal absorption\n3. Watch for signs of hypotension, especially during the first week\n\nAlways consult your healthcare provider for personalized medical advice."
    }
  ]);
  const [input, setInput] = useState("");

  // Sample responses for common drug-related queries
  const getAIResponse = (query) => {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes("neurolex") && queryLower.includes("dosage")) {
      return "Neurolex standard dosing:\n• Initial: 300mg once daily\n• Maintenance: 300mg twice daily\n• Maximum: 600mg twice daily\n\nDose should be titrated gradually over 2-3 weeks for optimal tolerability.";
    }
    
    if (queryLower.includes("immunoboost") && queryLower.includes("pregnancy")) {
      return "Immunoboost is contraindicated during pregnancy (Category X). Studies have shown risk to the fetus. Alternative therapies should be considered for patients who are pregnant or planning pregnancy. Consult your healthcare provider for suitable alternatives.";
    }
    
    if (queryLower.includes("gastroprotect") && queryLower.includes("food")) {
      return "Gastroprotect can be taken with or without food. However, for optimal effect in GERD treatment, it's recommended to take it:\n• 30-60 minutes before breakfast\n• On an empty stomach\n• With a full glass of water";
    }
    
    return "I understand you're asking about drug information. To provide accurate information, could you please be more specific about your question? You can ask about:\n• Dosage guidelines\n• Side effects\n• Drug interactions\n• Contraindications\n• Administration instructions";
  };

  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      const userMessage = { sender: "user", text: input.trim() };
      
      // Get AI response
      const aiResponse = { sender: "bot", text: getAIResponse(input.trim()) };
      
      // Update messages
      setMessages([...messages, userMessage, aiResponse]);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-3">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold">AI Medical Assistant</h2>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {/* Chat header */}
        <div className="bg-blue-800 text-white p-4 rounded-t-lg">
          <div className="flex items-center">
            <div className="bg-blue-700 p-3 rounded-full mr-3">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold">Medical AI Assistant</h3>
              <p className="text-sm opacity-90">Available 24/7 for drug information</p>
            </div>
            <div className="ml-auto flex items-center">
              <span className="bg-green-400 w-2 h-2 rounded-full mr-2"></span>
              <span className="text-sm">Online</span>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="h-[400px] overflow-y-auto p-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block max-w-[80%] p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {msg.text}
                </pre>
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="border-t p-4">
          <div className="flex items-center">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask about drug information..."
              rows="2"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white p-3 rounded-r hover:bg-blue-600 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Press Enter to send. Shift + Enter for new line.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot; 