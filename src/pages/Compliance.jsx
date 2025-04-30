import { Shield, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const Compliance = () => {
  const complianceData = {
    status: "Compliant",
    lastAudit: "2024-04-15",
    nextAudit: "2024-10-15",
    requirements: [
      {
        id: 1,
        title: "Data Privacy",
        status: "Compliant",
        lastUpdated: "2024-04-10",
        description: "All data handling practices comply with HIPAA and GDPR requirements."
      },
      {
        id: 2,
        title: "Documentation",
        status: "Compliant",
        lastUpdated: "2024-04-12",
        description: "All required documentation is up to date and properly maintained."
      },
      {
        id: 3,
        title: "Training",
        status: "Pending",
        lastUpdated: "2024-03-28",
        description: "Annual compliance training needs to be completed by all team members."
      },
      {
        id: 4,
        title: "Security",
        status: "Compliant",
        lastUpdated: "2024-04-05",
        description: "Security measures meet industry standards and regulatory requirements."
      }
    ]
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Shield className="w-8 h-8 mr-3 text-blue-600" />
          <h2 className="text-2xl font-bold">Compliance</h2>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm ${
            complianceData.status === 'Compliant'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {complianceData.status}
          </span>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Last Audit</h3>
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-gray-600">{complianceData.lastAudit}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Next Audit</h3>
            <Clock className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-gray-600">{complianceData.nextAudit}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Overall Status</h3>
            <div className={`px-3 py-1 rounded-full text-sm ${
              complianceData.status === 'Compliant'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {complianceData.status}
            </div>
          </div>
          <p className="text-gray-600">All major compliance requirements are met</p>
        </div>
      </div>

      {/* Requirements List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Compliance Requirements</h3>
        </div>
        <div className="divide-y">
          {complianceData.requirements.map((req) => (
            <div key={req.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{req.title}</h4>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  req.status === 'Compliant'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {req.status}
                </div>
              </div>
              <p className="text-gray-600 mb-2">{req.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                Last updated: {req.lastUpdated}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Notes */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Important Notes</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
            <div>
              <p className="font-medium">Annual Training Required</p>
              <p className="text-gray-600">All team members must complete the annual compliance training by the end of Q2.</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
            <div>
              <p className="font-medium">Documentation Up to Date</p>
              <p className="text-gray-600">All required documentation has been reviewed and updated in the last 30 days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance; 