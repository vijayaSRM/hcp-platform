import { useState } from 'react';
import { Plus, Video, Globe, Download, X, Calendar, Clock } from 'lucide-react';

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

const VideoConsultation = ({ selectedRep }) => {
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // Mock upcoming consultations
  const upcomingConsultations = [
    {
      id: 1,
      repName: "Dr. Sarah Chen",
      specialty: "Cardiology",
      date: "2024-05-15",
      time: "10:00 AM",
      duration: "30 minutes",
      topic: "Cardiozen Clinical Trial Results",
      status: "confirmed",
      meetingId: "123 456 7890",
      password: "123456",
      link: "https://zoom.us/j/1234567890?pwd=abcdef",
      image: PROFILE_IMAGES.representatives["Dr. Sarah Chen"]
    },
    {
      id: 2,
      repName: "Dr. Priya Sharma",
      specialty: "Immunology",
      date: "2024-05-17",
      time: "2:30 PM",
      duration: "45 minutes",
      topic: "Immunoboost Safety Profile Update",
      status: "pending",
      meetingId: "987 654 3210",
      password: "654321",
      link: "https://zoom.us/j/9876543210?pwd=xyz123",
      image: PROFILE_IMAGES.representatives["Dr. Priya Sharma"]
    }
  ];

  // Zoom Launch Modal Component
  const ZoomLaunchModal = ({ isOpen, onClose, meetingDetails }) => {
    if (!meetingDetails) return null;

    const handleLaunchZoom = (launchType) => {
      if (launchType === 'app') {
        window.location.href = `zoommtg://zoom.us/join?confno=${meetingDetails.meetingId}&pwd=${meetingDetails.password}`;
      } else {
        window.open(meetingDetails.link, '_blank');
      }
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Join Video Consultation</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="font-medium mb-2">Meeting Details:</p>
            <p className="text-sm text-gray-600">Meeting ID: {meetingDetails.meetingId}</p>
            <p className="text-sm text-gray-600">Password: {meetingDetails.password}</p>
            <p className="text-sm text-gray-600">Host: {meetingDetails.repName}</p>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Choose how you would like to join the video consultation:
          </p>

          <div className="space-y-3">
            <button
              onClick={() => handleLaunchZoom('app')}
              className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <Video className="w-5 h-5 mr-2" />
              Launch in Zoom App
            </button>

            <button
              onClick={() => handleLaunchZoom('browser')}
              className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <Globe className="w-5 h-5 mr-2" />
              Join from Browser
            </button>

            <div className="text-center mt-4">
              <a 
                href="https://zoom.us/download" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-1" />
                Download Zoom App
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Schedule New Consultation Component
  const ScheduleNewConsultation = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      representative: '',
      date: '',
      time: '',
      duration: '30',
      topic: '',
      notes: ''
    });

    // Mock available representatives
    const availableReps = [
      {
        id: 1,
        name: "Dr. Sarah Chen",
        specialty: "Cardiology",
        image: PROFILE_IMAGES.representatives["Dr. Sarah Chen"],
        availability: "Available"
      },
      {
        id: 2,
        name: "Dr. Priya Sharma",
        specialty: "Immunology",
        image: PROFILE_IMAGES.representatives["Dr. Priya Sharma"],
        availability: "Available"
      },
      {
        id: 3,
        name: "Dr. Michael Roberts",
        specialty: "Neurology",
        image: PROFILE_IMAGES.representatives["Dr. Michael Roberts"],
        availability: "Busy"
      }
    ];

    // Mock available time slots
    const availableTimeSlots = [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM"
    ];

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        onClose();
      } catch (error) {
        console.error('Error scheduling consultation:', error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const validateStep = (stepNumber) => {
      switch (stepNumber) {
        case 1:
          return !!formData.representative;
        case 2:
          return !!formData.date && !!formData.time;
        case 3:
          return !!formData.topic;
        default:
          return true;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-[600px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Schedule New Consultation - Step {step} of 3</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-24 h-1 ${
                    step > stepNumber ? 'bg-blue-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Select Representative</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableReps.map((rep) => (
                    <div 
                      key={rep.id}
                      onClick={() => handleInputChange({ 
                        target: { name: 'representative', value: rep.name }
                      })}
                      className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 ${
                        formData.representative === rep.name ? 'border-blue-500 bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={rep.image}
                            alt={rep.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{rep.name}</h4>
                          <p className="text-sm text-gray-600">{rep.specialty}</p>
                          <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                            rep.availability === 'Available' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {rep.availability}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Select Date & Time</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {availableTimeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleInputChange({
                          target: { name: 'time', value: slot }
                        })}
                        className={`p-2 border rounded-lg text-center ${
                          formData.time === slot 
                            ? 'bg-blue-500 text-white border-blue-500' 
                            : 'hover:border-blue-500'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Consultation Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Topic
                    </label>
                    <input
                      type="text"
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      placeholder="e.g., Cardiozen Clinical Trial Discussion"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any specific points you'd like to discuss..."
                      rows="4"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  {/* Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <h4 className="font-medium mb-2">Consultation Summary</h4>
                    <div className="text-sm text-gray-600">
                      <p><strong>Representative:</strong> {formData.representative}</p>
                      <p><strong>Date:</strong> {formData.date}</p>
                      <p><strong>Time:</strong> {formData.time}</p>
                      <p><strong>Duration:</strong> {formData.duration} minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                >
                  {isSubmitting ? "Scheduling..." : "Schedule Consultation"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Video Consultation</h2>
        <button 
          onClick={() => setShowScheduleModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule New Consultation
        </button>
      </div>

      {/* Next Consultation Card */}
      {upcomingConsultations[0] && (
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-blue-500">
                <img
                  src={upcomingConsultations[0].image}
                  alt={upcomingConsultations[0].repName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold">Next Consultation</h3>
                  <span className={`ml-3 px-2 py-1 rounded-full text-xs ${
                    upcomingConsultations[0].status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {upcomingConsultations[0].status.charAt(0).toUpperCase() + upcomingConsultations[0].status.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600">{upcomingConsultations[0].repName} - {upcomingConsultations[0].time}</p>
                <p className="text-sm text-gray-500">{upcomingConsultations[0].specialty}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedMeeting(upcomingConsultations[0]);
                setShowZoomModal(true);
              }}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
            >
              <Video className="w-4 h-4 mr-2" />
              Join Now
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Consultations List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Upcoming Consultations</h3>
        </div>
        <div className="divide-y">
          {upcomingConsultations.map((consultation, index) => (
            index > 0 && (
              <div key={consultation.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={consultation.image}
                        alt={consultation.repName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{consultation.topic}</h4>
                      <p className="text-sm text-gray-600">{consultation.repName} - {consultation.specialty}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{consultation.date} at {consultation.time}</span>
                        <span className="mx-2">•</span>
                        <span>{consultation.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      consultation.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedMeeting(consultation);
                        setShowZoomModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Video className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Modals */}
      {showScheduleModal && (
        <ScheduleNewConsultation 
          isOpen={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
        />
      )}

      {showZoomModal && (
        <ZoomLaunchModal
          isOpen={showZoomModal}
          onClose={() => {
            setShowZoomModal(false);
            setSelectedMeeting(null);
          }}
          meetingDetails={selectedMeeting}
        />
      )}
    </div>
  );
};

export default VideoConsultation; 