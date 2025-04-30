import { useState } from 'react';

const FeedbackForm = () => {
  const [activeTab, setActiveTab] = useState('give');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('');

  const pastFeedback = [
    {
      id: 1,
      date: "2024-05-01",
      category: "Drug Information",
      rating: 5,
      comment: "Excellent information about Cardiozen. Very helpful for patient care.",
      status: "Addressed"
    },
    {
      id: 2,
      date: "2024-04-28",
      category: "Platform Usage",
      rating: 4,
      comment: "The video consultation feature is great, but could use better calendar integration.",
      status: "Under Review"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Feedback Center</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab('give')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'give'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Give Feedback
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Feedback History
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'give' ? (
            <div className="max-w-2xl">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select a category</option>
                  <option value="drug">Drug Information</option>
                  <option value="platform">Platform Usage</option>
                  <option value="support">Technical Support</option>
                  <option value="consultation">Video Consultation</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Please share your thoughts..."
                ></textarea>
              </div>

              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Submit Feedback
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {pastFeedback.map((feedback) => (
                <div key={feedback.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-medium">{feedback.category}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        {feedback.date}
                      </span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      feedback.status === 'Addressed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {feedback.status}
                    </div>
                  </div>
                  <div className="text-yellow-400 mb-2">
                    {'★'.repeat(feedback.rating)}
                    {'☆'.repeat(5 - feedback.rating)}
                  </div>
                  <p className="text-gray-600">{feedback.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm; 