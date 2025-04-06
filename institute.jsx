import { useState } from 'react';

const InstituteDashboard = () => {
  const [activeTab, setActiveTab] = useState('verified');
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState({
    verified: [
      { id: 1, name: 'Degree Certificate - John Doe', date: '2023-05-15', studentId: 'S1001' },
      { id: 2, name: 'Transcript - Jane Smith', date: '2023-06-20', studentId: 'S1002' },
    ],
    unverified: [
      { id: 3, name: 'Diploma - Alex Johnson', date: '2023-07-10', studentId: 'S1003' },
      { id: 4, name: 'Certificate - Sarah Williams', date: '2023-07-12', studentId: 'S1004' },
    ],
    rejected: [
      { id: 5, name: 'Certificate - Michael Brown', date: '2023-06-01', studentId: 'S1005', reason: 'Incomplete information' },
    ]
  });

  // Verify a document
  const verifyDocument = (docId) => {
    setDocuments(prev => {
      const docToVerify = prev.unverified.find(doc => doc.id === docId);
      if (!docToVerify) return prev;
      
      return {
        ...prev,
        verified: [...prev.verified, docToVerify],
        unverified: prev.unverified.filter(doc => doc.id !== docId)
      };
    });
  };

  // Reject a document
  const rejectDocument = (docId) => {
    setDocuments(prev => {
      const docToReject = prev.unverified.find(doc => doc.id === docId);
      if (!docToReject) return prev;
      
      return {
        ...prev,
        rejected: [...prev.rejected, { ...docToReject, reason: 'Pending review' }],
        unverified: prev.unverified.filter(doc => doc.id !== docId)
      };
    });
  };

  // Filter documents based on search term
  const filteredDocuments = (tab) => {
    return documents[tab].filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.reason && doc.reason.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Download document
  const downloadDocument = (docId) => {
    console.log(`Downloading document ${docId}`);
    // In a real app, this would link to your backend
  };

  // Restore rejected document to unverified
  const restoreDocument = (docId) => {
    setDocuments(prev => {
      const docToRestore = prev.rejected.find(doc => doc.id === docId);
      if (!docToRestore) return prev;
      
      return {
        ...prev,
        unverified: [...prev.unverified, docToRestore],
        rejected: prev.rejected.filter(doc => doc.id !== docId)
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Institute Portal</div>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              I
            </div>
            <div>
              <h1 className="text-2xl font-bold">Institute of Technology</h1>
              <p className="text-gray-600">admin@institute.edu</p>
              <p className="text-gray-600">Verified Educational Institute</p>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'verified' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('verified')}
              >
                Verified ({documents.verified.length})
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'unverified' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('unverified')}
              >
                Pending ({documents.unverified.length})
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'rejected' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('rejected')}
              >
                Rejected ({documents.rejected.length})
              </button>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search documents..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Documents List */}
          <div className="space-y-4">
            {filteredDocuments(activeTab).length > 0 ? (
              filteredDocuments(activeTab).map(doc => (
                <div key={doc.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <div className="flex space-x-4 text-sm text-gray-500 mt-1">
                        <p>Submitted: {doc.date}</p>
                        <p>Student ID: {doc.studentId}</p>
                        {activeTab === 'rejected' && doc.reason && (
                          <p>Reason: <span className="text-red-500">{doc.reason}</span></p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {activeTab === 'unverified' && (
                        <>
                          <button 
                            onClick={() => verifyDocument(doc.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => rejectDocument(doc.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {activeTab === 'rejected' && (
                        <button 
                          onClick={() => restoreDocument(doc.id)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                        >
                          Restore
                        </button>
                      )}
                      <button 
                        onClick={() => downloadDocument(doc.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Download
                      </button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No {activeTab} documents found {searchTerm && `matching "${searchTerm}"`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstituteDashboard;