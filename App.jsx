import React, { useState, useEffect } from 'react';

export default function ProfilePage() {
  // State declarations
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedDocument, setSelectedDocument] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [documentSearchTerm, setDocumentSearchTerm] = useState('');
  const [showDocumentSuggestions, setShowDocumentSuggestions] = useState(false);
  const [showInstituteSuggestions, setShowInstituteSuggestions] = useState(false);
  const [pendingSkills, setPendingSkills] = useState(['JavaScript', 'React']);
  const [verifiedSkills, setVerifiedSkills] = useState(['HTML', 'CSS']);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupType, setSignupType] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    phone: '',
    instituteName: '',
    contactPerson: ''
  });
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  
  // Sample student data
  const [studentData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    address: '123 University Ave, Campus Town',
    phone: '+1 (555) 123-4567',
    institution: 'State University',
    major: 'Computer Science',
    graduationYear: '2024'
  });

  // Indian educational institutions data
  const indianInstitutions = [
    { category: 'IITs', institutions: [
      'IIT Bombay', 'IIT Delhi', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
      'IIT Roorkee', 'IIT Guwahati', 'IIT Hyderabad', 'IIT (BHU) Varanasi',
      'IIT Indore', 'IIT Mandi', 'IIT Patna', 'IIT Gandhinagar', 'IIT Jodhpur',
      'IIT Ropar', 'IIT Bhubaneswar', 'IIT Tirupati', 'IIT Goa', 'IIT Palakkad',
      'IIT Dhanbad', 'IIT Bhilai', 'IIT Jammu'
    ]},
    { category: 'NITs', institutions: [
      'NIT Trichy', 'NIT Warangal', 'NIT Surathkal', 'NIT Calicut', 'NIT Rourkela',
      'NIT Kurukshetra', 'NIT Durgapur', 'NIT Silchar', 'NIT Hamirpur',
      'NIT Jalandhar', 'NIT Jaipur', 'NIT Allahabad', 'NIT Bhopal', 'NIT Nagpur',
      'NIT Patna', 'NIT Raipur', 'NIT Srinagar', 'NIT Surat', 'NIT Meghalaya',
      'NIT Uttarakhand', 'NIT Puducherry', 'NIT Delhi', 'NIT Goa', 'NIT Mizoram'
    ]},
    { category: 'IIITs', institutions: [
      'IIIT Hyderabad', 'IIIT Bangalore', 'IIIT Allahabad', 'IIIT Delhi',
      'IIIT Jabalpur', 'IIIT Kancheepuram', 'IIIT Guwahati', 'IIIT Vadodara',
      'IIIT Kota', 'IIIT Sri City', 'IIIT Pune', 'IIIT Sonepat', 'IIIT Kurnool',
      'IIIT Dharwad', 'IIIT Lucknow', 'IIIT Bhagalpur', 'IIIT Agartala',
      'IIIT Ranchi', 'IIIT Surat', 'IIIT Bhopal', 'IIIT Nagpur'
    ]},
    { category: 'Central Universities', institutions: [
      'University of Delhi', 'Jawaharlal Nehru University', 'Banaras Hindu University',
      'University of Hyderabad', 'Aligarh Muslim University', 'Jamia Millia Islamia',
      'Pondicherry University', 'Visva Bharati University', 'Central University of Rajasthan',
      'Central University of Haryana', 'Central University of Punjab', 'Central University of Kashmir'
    ]},
    { category: 'Famous Schools', institutions: [
      'Delhi Public School', 'Kendriya Vidyalaya', 'Navodaya Vidyalaya',
      'The Doon School', 'Mayo College', 'Sainik School',
      'St. Xavier\'s Collegiate School', 'La Martiniere College',
      'Bishop Cotton School', 'Modern School', 'Sanskriti School'
    ]}
  ];

  // Document types for verification
  const documentTypes = [
    '10th Mark Sheet',
    '12th Mark Sheet',
    'College Degree',
    'College Transcript',
    'Diploma Certificate',
    'Transfer Certificate',
    'Migration Certificate',
    'Aadhaar Card',
    'PAN Card',
    'Passport'
  ];

  // Filter documents based on search term
  const [filteredDocuments, setFilteredDocuments] = useState(documentTypes);
  useEffect(() => {
    if (documentSearchTerm) {
      setFilteredDocuments(
        documentTypes.filter(doc =>
          doc.toLowerCase().includes(documentSearchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredDocuments(documentTypes);
    }
  }, [documentSearchTerm]);

  // Filter institutions based on search term
  const filteredInstitutions = indianInstitutions.map(group => ({
    category: group.category,
    institutions: group.institutions.filter(inst => 
      inst.toLowerCase().includes(searchTerm.toLowerCase()))
  })).filter(group => group.institutions.length > 0);

  // Handle document selection
  const handleDocumentSelect = (doc) => {
    setSelectedDocument(doc);
    setDocumentSearchTerm(doc);
    setShowDocumentSuggestions(false);
  };

  // Handle institute selection
  const handleInstituteSelect = (inst) => {
    setSelectedInstitute(inst);
    setSearchTerm(inst);
    setShowInstituteSuggestions(false);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Uploaded file:', file.name);
      // Here you would typically handle the file upload to a server
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    console.log('Login attempt with:', loginCredentials);
    setShowLoginModal(false);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log(`Signup as ${signupType} submitted:`, signupForm);
    setShowSignupModal(false);
    // Reset form
    setSignupForm({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      password: '',
      confirmPassword: '',
      phone: '',
      instituteName: '',
      contactPerson: ''
    });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({ ...prev, [name]: value }));
  };

  const renderSignupForm = () => {
    if (signupType === 'student') {
      return (
        <form className="space-y-4" onSubmit={handleSignupSubmit}>
          <input 
            type="text" 
            name="firstName"
            placeholder="First Name" 
            className="w-full p-2 border rounded" 
            value={signupForm.firstName}
            onChange={handleSignupChange}
            required 
          />
          <input 
            type="text" 
            name="lastName"
            placeholder="Last Name" 
            className="w-full p-2 border rounded" 
            value={signupForm.lastName}
            onChange={handleSignupChange}
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            className="w-full p-2 border rounded" 
            value={signupForm.email}
            onChange={handleSignupChange}
            required 
          />
          <input 
            type="text" 
            name="address"
            placeholder="Address" 
            className="w-full p-2 border rounded" 
            value={signupForm.address}
            onChange={handleSignupChange}
            required 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            className="w-full p-2 border rounded" 
            value={signupForm.password}
            onChange={handleSignupChange}
            required 
          />
          <input 
            type="password" 
            name="confirmPassword"
            placeholder="Confirm Password" 
            className="w-full p-2 border rounded" 
            value={signupForm.confirmPassword}
            onChange={handleSignupChange}
            required 
          />
          <input 
            type="tel" 
            name="phone"
            placeholder="Phone Number" 
            className="w-full p-2 border rounded" 
            value={signupForm.phone}
            onChange={handleSignupChange}
            required 
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
        </form>
      );
    } else if (signupType === 'institute') {
      return (
        <form className="space-y-4" onSubmit={handleSignupSubmit}>
          <input 
            type="text" 
            name="instituteName"
            placeholder="Institute Name" 
            className="w-full p-2 border rounded" 
            value={signupForm.instituteName}
            onChange={handleSignupChange}
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            className="w-full p-2 border rounded" 
            value={signupForm.email}
            onChange={handleSignupChange}
            required 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            className="w-full p-2 border rounded" 
            value={signupForm.password}
            onChange={handleSignupChange}
            required 
          />
          <input 
            type="password" 
            name="confirmPassword"
            placeholder="Confirm Password" 
            className="w-full p-2 border rounded" 
            value={signupForm.confirmPassword}
            onChange={handleSignupChange}
            required 
          />
          <input 
            type="text" 
            name="address"
            placeholder="Address" 
            className="w-full p-2 border rounded" 
            value={signupForm.address}
            onChange={handleSignupChange}
            required 
          />
          <input 
            type="text" 
            name="contactPerson"
            placeholder="Contact Person" 
            className="w-full p-2 border rounded" 
            value={signupForm.contactPerson}
            onChange={handleSignupChange}
            required 
          />
          <input 
            type="tel" 
            name="phone"
            placeholder="Phone Number" 
            className="w-full p-2 border rounded" 
            value={signupForm.phone}
            onChange={handleSignupChange}
            required 
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
        </form>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <h1 className="text-xl font-bold text-gray-800">Skilify</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Sign In
            </button>
            <button
              onClick={() => { setShowSignupModal(true); setSignupType(''); }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Verify and Showcase Your Skills</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get your skills certified by recognized institutions and stand out to employers
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Start Verification Process
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-100">
                  <img
                    src="https://thumbs.dreamstime.com/b/young-man-anime-style-character-vector-illustration-design-manga-boy-black-hair-faces-cartoon-face-male-isolated-281620892.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{studentData.firstName} {studentData.lastName}</h2>
                <p className="text-gray-600 mb-4">{studentData.major} Student</p>
                
                <button 
                  onClick={() => setShowProfileDetails(!showProfileDetails)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 transition-colors"
                >
                  {showProfileDetails ? 'Hide Profile Details' : 'View Profile Details'}
                </button>

                {/* Profile Details Section */}
                {showProfileDetails && (
                  <div className="mt-4 text-left bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-3">Personal Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Full Name:</span>
                        <span className="font-medium">{studentData.firstName} {studentData.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{studentData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{studentData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium">{studentData.address}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-blue-800 mt-4 mb-3">Academic Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Institution:</span>
                        <span className="font-medium">{studentData.institution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Major:</span>
                        <span className="font-medium">{studentData.major}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Graduation Year:</span>
                        <span className="font-medium">{studentData.graduationYear}</span>
                      </div>
                    </div>

                    <button className="mt-4 w-full bg-white text-blue-600 border border-blue-600 py-2 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium">
                      Edit Profile
                    </button>
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Verification Status</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Profile Completeness</span>
                    <span className="text-sm font-semibold">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
              <div className="border-t p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Quick Actions</h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setShowProfileDetails(!showProfileDetails)}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                    >
                      {showProfileDetails ? 'Hide Profile' : 'View Profile'}
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors">
                      View Certificates
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors">
                      Account Settings
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Profile Content */}
          <div className="w-full lg:w-3/4 space-y-8">
            {/* Verification Card */}
            <section className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Document Verification</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Document Type Selection with Search */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Document Type
                    </label>
                    <input
                      type="text"
                      placeholder="Search document types..."
                      className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={documentSearchTerm}
                      onChange={(e) => {
                        setDocumentSearchTerm(e.target.value);
                        setShowDocumentSuggestions(true);
                      }}
                      onFocus={() => setShowDocumentSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowDocumentSuggestions(false), 200)}
                    />
                    {showDocumentSuggestions && filteredDocuments.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {filteredDocuments.map((doc, index) => (
                          <div
                            key={index}
                            className="p-3 hover:bg-blue-50 cursor-pointer"
                            onClick={() => handleDocumentSelect(doc)}
                          >
                            {doc}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Institute Selection with Search */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Verification Institute
                    </label>
                    <input
                      type="text"
                      placeholder="Search institutions..."
                      className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowInstituteSuggestions(true);
                      }}
                      onFocus={() => setShowInstituteSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowInstituteSuggestions(false), 200)}
                    />
                    {showInstituteSuggestions && searchTerm && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                        {filteredInstitutions.map((group, index) => (
                          <div key={index}>
                            <div className="px-3 py-2 bg-gray-100 text-gray-700 font-medium">
                              {group.category}
                            </div>
                            {group.institutions.map((inst, idx) => (
                              <div
                                key={`${index}-${idx}`}
                                className="p-3 hover:bg-blue-50 cursor-pointer"
                                onClick={() => handleInstituteSelect(inst)}
                              >
                                {inst}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload {selectedDocument || 'Document'}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                      {selectedDocument 
                        ? `Upload your ${selectedDocument} for verification`
                        : 'Select a document type to upload'}
                    </p>
                    <input
                      type="file"
                      onChange={handleUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
                      Select Files
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      PDF, JPG, or PNG up to 10MB
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      !selectedDocument || !selectedInstitute
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    disabled={!selectedDocument || !selectedInstitute}
                  >
                    Submit for Verification
                  </button>
                </div>
              </div>
            </section>

            {/* Skills Dashboard */}
            <section className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Skills Dashboard</h2>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pending Skills */}
                  <div className="border rounded-lg p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-800">Pending Verification</h3>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        {pendingSkills.length} pending
                      </span>
                    </div>
                    {pendingSkills.length > 0 ? (
                      <ul className="space-y-3">
                        {pendingSkills.map((skill, index) => (
                          <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                              <span>{skill}</span>
                            </div>
                            <button className="text-sm text-blue-600 hover:text-blue-800">
                              View Details
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="mt-2">No skills pending verification</p>
                      </div>
                    )}
                  </div>

                  {/* Verified Skills */}
                  <div className="border rounded-lg p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-800">Verified Skills</h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {verifiedSkills.length} verified
                      </span>
                    </div>
                    {verifiedSkills.length > 0 ? (
                      <ul className="space-y-3">
                        {verifiedSkills.map((skill, index) => (
                          <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                              <span>{skill}</span>
                            </div>
                            <button className="text-sm text-blue-600 hover:text-blue-800">
                              View Certificate
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="mt-2">No verified skills yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Skilify</h3>
              <p className="text-gray-400">
                Connecting students with institutions for skill verification and certification.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>contact@skilify.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 Skilify. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            {!signupType ? (
              <>
                <h2 className="text-2xl font-bold mb-4 text-center">Sign up as</h2>
                <button
                  className="w-full py-3 mb-4 rounded-full bg-blue-600 text-white text-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors"
                  onClick={() => setSignupType('student')}
                >
                  🎓 Student
                </button>
                <button
                  className="w-full py-3 rounded-full bg-blue-600 text-white text-lg font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors"
                  onClick={() => setSignupType('institute')}
                >
                  🏫 Institute
                </button>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setShowSignupModal(false)}
                    className="text-blue-600 font-semibold hover:text-blue-800"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Continue to sign up as {signupType === 'student' ? 'Student' : 'Institute'}
                </h2>
                {renderSignupForm()}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setSignupType('')}
                    className="text-blue-600 font-semibold hover:text-blue-800"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setSignupType('');
                      setShowSignupModal(false);
                    }}
                    className="text-blue-600 font-semibold hover:text-blue-800"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                className="w-full p-2 border rounded" 
                value={loginCredentials.email}
                onChange={handleLoginChange}
                required
              />
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                className="w-full p-2 border rounded" 
                value={loginCredentials.password}
                onChange={handleLoginChange}
                required
              />
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </form>
            <div className="flex justify-between mt-4">
              <button className="text-blue-600 font-semibold hover:text-blue-800">
                Forgot Password?
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-blue-600 font-semibold hover:text-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}