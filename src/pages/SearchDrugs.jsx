import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchDrugs = ({ selectedDrug, setSelectedDrug }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    { id: "all", label: "All" },
    { id: "name", label: "Drug Name" },
    { id: "indication", label: "Indication" },
    { id: "studies", label: "Clinical Studies" }
  ];

  // Mock data
  const mockDrugs = [
    { id: 1, name: "Cardiozen", indication: "Hypertension", dosage: "10-20mg daily", contraindications: "Pregnancy, severe kidney disease", sideEffects: "Dizziness, cough", clinicalStudies: "ALLHAT Trial, VALUE Trial" },
    { id: 2, name: "Neurolex", indication: "Epilepsy", dosage: "300mg twice daily", contraindications: "Liver disease", sideEffects: "Drowsiness, headache", clinicalStudies: "SANAD Study, KOMET Trial" },
    { id: 3, name: "Immunoboost", indication: "Rheumatoid Arthritis", dosage: "40mg every other week", contraindications: "Active infection, TB", sideEffects: "Injection site reaction, increased infection risk", clinicalStudies: "PREMIER Trial, DE019 Study" },
    { id: 4, name: "Gastroprotect", indication: "GERD, Peptic Ulcer", dosage: "20mg daily", contraindications: "None significant", sideEffects: "Headache, diarrhea", clinicalStudies: "LOTUS Trial, OMNIUM Study" },
    { id: 5, name: "Glucobalance", indication: "Type 2 Diabetes", dosage: "500-2000mg daily", contraindications: "Kidney failure, metabolic acidosis", sideEffects: "GI upset, B12 deficiency", clinicalStudies: "UKPDS, ADOPT Trial" }
  ];

  useEffect(() => {
    if (searchTerm.length > 2) {
      setIsSearching(true);
      
      const timer = setTimeout(() => {
        const term = searchTerm.toLowerCase();
        let filtered = [];
        
        if (searchCategory === "all") {
          filtered = mockDrugs.filter(drug => 
            drug.name.toLowerCase().includes(term) || 
            drug.indication.toLowerCase().includes(term) ||
            drug.clinicalStudies.toLowerCase().includes(term)
          );
        } else if (searchCategory === "name") {
          filtered = mockDrugs.filter(drug => drug.name.toLowerCase().includes(term));
        } else if (searchCategory === "indication") {
          filtered = mockDrugs.filter(drug => drug.indication.toLowerCase().includes(term));
        } else if (searchCategory === "studies") {
          filtered = mockDrugs.filter(drug => drug.clinicalStudies.toLowerCase().includes(term));
        }
        
        setResults(filtered);
        setIsSearching(false);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [searchTerm, searchCategory]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Drug Information</h2>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center mb-4">
          <div className="flex-1 mb-2 md:mb-0 md:mr-4">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search for drug information..."
              />
              <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            </div>
          </div>
          
          <div className="flex">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSearchCategory(category.id)}
                className={`px-4 py-2 text-sm ${
                  searchCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } rounded-md mr-2 last:mr-0`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          Search by drug name, indication, or clinical study
        </div>
      </div>
      
      {isSearching ? (
        <div className="text-center p-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-2 text-gray-600">Searching...</p>
        </div>
      ) : selectedDrug ? (
        <DrugDetail drug={selectedDrug} onClose={() => setSelectedDrug(null)} />
      ) : (
        <div>
          {searchTerm.length > 0 && (
            <p className="mb-4 text-gray-600">
              {results.length === 0
                ? "No drugs found matching your search"
                : `Found ${results.length} drug${results.length !== 1 ? "s" : ""}`}
            </p>
          )}
          
          <div className="grid grid-cols-1 gap-4">
            {searchTerm.length === 0
              ? mockDrugs.map((drug) => (
                  <DrugCard 
                    key={drug.id} 
                    drug={drug} 
                    onClick={() => setSelectedDrug(drug)} 
                  />
                ))
              : results.map((drug) => (
                  <DrugCard 
                    key={drug.id} 
                    drug={drug} 
                    onClick={() => setSelectedDrug(drug)} 
                  />
                ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

const DrugCard = ({ drug, onClick }) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-blue-800">{drug.name}</h3>
          <p className="text-gray-700 font-medium mt-1">{drug.indication}</p>
        </div>
        <button 
          className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-100"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          View Details
        </button>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500">DOSAGE</label>
          <p className="mt-1">{drug.dosage}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500">SIDE EFFECTS</label>
          <p className="mt-1">{drug.sideEffects}</p>
        </div>
      </div>
    </div>
  );
};

const DrugDetail = ({ drug, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "dosage", label: "Dosage" },
    { id: "safety", label: "Safety" },
    { id: "studies", label: "Clinical Studies" },
    { id: "resources", label: "Resources" }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="bg-blue-800 p-6 text-white flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">{drug.name}</h3>
          <p className="mt-1 opacity-90">{drug.indication}</p>
        </div>
        <button 
          onClick={onClose}
          className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full"
          aria-label="Close drug details"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === "overview" && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Overview</h4>
            <p className="text-gray-600">
              <strong>Indication:</strong> {drug.indication}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Clinical Studies:</strong> {drug.clinicalStudies}
            </p>
          </div>
        )}
        {activeTab === "dosage" && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Dosage Information</h4>
            <p className="text-gray-600">{drug.dosage}</p>
          </div>
        )}
        {activeTab === "safety" && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Safety Information</h4>
            <p className="text-gray-600">
              <strong>Contraindications:</strong> {drug.contraindications}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Side Effects:</strong> {drug.sideEffects}
            </p>
          </div>
        )}
        {activeTab === "studies" && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Clinical Studies</h4>
            <p className="text-gray-600">{drug.clinicalStudies}</p>
          </div>
        )}
        {activeTab === "resources" && (
          <div>
            <h4 className="text-lg font-semibold mb-2">Related Resources</h4>
            <p className="text-gray-600">No additional resources available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDrugs; 