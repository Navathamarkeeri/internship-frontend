import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Browse Jobs');
  const [searchQuery, setSearchQuery] = useState('Search Data Science internships in Bangalore');
  const [locationFilter, setLocationFilter] = useState('Location');
  const [internshipType, setInternshipType] = useState([]);
  const [stipendRange, setStipendRange] = useState([0, 20000]);
  const [duration, setDuration] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Get user email from navigation state or use default
  const userEmail = location.state?.userEmail || 'user@example.com';
  const userData = {
    username: userEmail.split('@')[0],
    email: userEmail,
    avatar: userEmail.charAt(0).toUpperCase()
  };

  // Sample notifications data with state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New internship match",
      message: "Google Data Science internship matches your profile",
      time: "2 hours ago",
      type: "match",
      isRead: false
    },
    {
      id: 2,
      title: "Application update",
      message: "Your application to Microsoft has been reviewed",
      time: "1 day ago",
      type: "application",
      isRead: false
    },
    {
      id: 3,
      title: "Profile completion",
      message: "Complete your profile to get better matches",
      time: "3 days ago",
      type: "profile",
      isRead: true
    }
  ]);

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const internships = [
    {
      id: 1,
      title: 'Data Science Intern',
      company: 'DataFlow Inc',
      companyLogo: 'DF',
      location: 'Mumbai',
      type: 'Hybrid',
      salary: '₹18,000',
      duration: '6 months',
      match: '85%',
      description: 'Analyze large datasets and build ML models',
      skills: ['Python', 'Machine Learning', 'SQL'],
      postedDays: 2,
      isSaved: false
    },
    {
      id: 2,
      title: 'UI/UX Design Intern',
      company: 'DesignStudio',
      companyLogo: 'DS',
      location: 'Delhi',
      type: 'Full-time',
      salary: '₹12,000',
      duration: '4 months',
      match: '78%',
      description: 'Create user-centered designs for mobile and web',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      postedDays: 2,
      isSaved: true
    },
    {
      id: 3,
      title: 'Backend Developer Intern',
      company: 'CloudTech',
      companyLogo: 'CT',
      location: 'Hyderabad',
      type: 'Full-time',
      salary: '₹16,000',
      duration: '3 months',
      match: '88%',
      description: 'Build scalable APIs and microservices',
      skills: ['Node.js', 'MongoDB', 'AWS'],
      postedDays: 2,
      isSaved: false
    },
    {
      id: 4,
      title: 'Frontend Developer Intern',
      company: 'TechCorp',
      companyLogo: 'TC',
      location: 'Bangalore',
      type: 'Remote',
      salary: '₹15,000',
      duration: '3 months',
      match: '92%',
      description: 'Work on React.js applications with modern technologies',
      skills: ['React', 'JavaScript', 'HTML/CSS'],
      postedDays: 2,
      isSaved: true
    }
  ];

  const handleInternshipTypeChange = (type) => {
    setInternshipType(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const applyFilters = () => {
    console.log('Applying filters:', { locationFilter, internshipType, stipendRange, duration });
  };

  const clearFilters = () => {
    setLocationFilter('Location');
    setInternshipType([]);
    setStipendRange([0, 20000]);
    setDuration('');
  };

  const applications = [
    {
      id: 1,
      jobTitle: 'Frontend Developer Intern',
      company: 'TechCorp',
      appliedOn: 'Dec 15, 2024',
      status: 'Pending'
    },
    {
      id: 2,
      jobTitle: 'Data Science Intern',
      company: 'DataFlow Inc',
      appliedOn: 'Dec 12, 2024',
      status: 'Interview Scheduled'
    },
    {
      id: 3,
      jobTitle: 'Mobile App Intern',
      company: 'AppWorks',
      appliedOn: 'Dec 10, 2024',
      status: 'Rejected'
    }
  ];

  const applicationStats = {
    pending: 1,
    interviews: 1,
    accepted: 0,
    rejected: 1
  };

  // Calculate dynamic counts
  const savedJobsCount = internships.filter(job => job.isSaved).length;
  const totalApplications = applications.length;


  return (
    <div className="dashboard-container">
      {/* Header Navigation */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="app-logo">InternshipAI</h1>
        </div>
        <nav className="header-nav">
          <button 
            className="nav-link active" 
            onClick={() => navigate('/dashboard')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard
          </button>
          <button 
            className="nav-link" 
            onClick={() => navigate('/profile')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Profile
          </button>
        </nav>
        <div className="header-actions">
          <div className="user-profile">
            <div className="notification-wrapper">
              <button 
                className="notification-icon"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="notification-dot"></span>
                )}
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <span className="notifications-count">
                      {notifications.filter(n => !n.isRead).length} new
                    </span>
                  </div>
                  <div className="notifications-list">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
                      >
                        <div className="notification-content">
                          <h4 className="notification-title">{notification.title}</h4>
                          <p className="notification-message">{notification.message}</p>
                          <span className="notification-time">{notification.time}</span>
                        </div>
                        {!notification.isRead && <div className="unread-indicator"></div>}
                      </div>
                    ))}
                  </div>
                  <div className="notifications-footer">
                    <button className="mark-all-read-btn" onClick={markAllAsRead}>Mark all as read</button>
                  </div>
                </div>
              )}
            </div>
            <div className="user-info">
              <span className="user-avatar">{userData.avatar}</span>
              <div className="user-details">
                <span className="user-email">{userData.email}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="welcome-section">
          <h2 className="welcome-title">Welcome back, {userData.username}!</h2>
          <p className="welcome-subtitle">Ready to find your next internship opportunity?</p>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-bar">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search Data Science internships in Bangalore"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="location-filter">
            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
              <option>Location</option>
              <option>Bangalore</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Hyderabad</option>
              <option>Remote</option>
            </select>
          </div>
          <button className="search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
          </button>
        </div>

        <div className="dashboard-content">
          {/* Left Sidebar */}
          <aside className="sidebar">
            {/* AI Suggestions */}
            <div className="ai-suggestions-card">
              <div className="ai-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <span>AI Suggestions</span>
              </div>
              <div className="suggestion-item">
                <p>Boost your resume with keywords like <strong>Python, TensorFlow</strong> for better matches in Data Science roles.</p>
              </div>
              <div className="suggestion-item">
                <p>Add <strong>React, Node.js</strong> to match 85% more developer positions.</p>
              </div>
            </div>

            {/* Filters */}
            <div className="filters-card">
              <h3>Filters</h3>
              
              {/* Location Filter */}
              <div className="filter-group">
                <div className="filter-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Location</span>
                </div>
                <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="filter-select">
                  <option>Select location</option>
                  <option>Bangalore</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Hyderabad</option>
                  <option>Remote</option>
                </select>
              </div>

              {/* Internship Type Filter */}
              <div className="filter-group">
                <div className="filter-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  <span>Internship Type</span>
                </div>
                <div className="checkbox-group">
                  {['Full-time', 'Part-time', 'Remote', 'Hybrid'].map(type => (
                    <label key={type} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={internshipType.includes(type)}
                        onChange={() => handleInternshipTypeChange(type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stipend Range Filter */}
              <div className="filter-group">
                <div className="filter-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  <span>Stipend Range</span>
                </div>
                <div className="range-slider">
                  <div className="range-values">
                    <span>₹0</span>
                    <span>₹10</span>
                    <span>₹20,000</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20000"
                    value={stipendRange[1]}
                    onChange={(e) => setStipendRange([0, parseInt(e.target.value)])}
                    className="range-input"
                  />
                </div>
              </div>

              {/* Duration Filter */}
              <div className="filter-group">
                <div className="filter-header">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                  <span>Duration</span>
                </div>
                <select value={duration} onChange={(e) => setDuration(e.target.value)} className="filter-select">
                  <option value="">Select duration</option>
                  <option value="1-3">1-3 months</option>
                  <option value="3-6">3-6 months</option>
                  <option value="6+">6+ months</option>
                </select>
              </div>

              {/* Filter Actions */}
              <div className="filter-actions">
                <button onClick={applyFilters} className="apply-filters-btn">
                  Apply Filters
                </button>
                <button onClick={clearFilters} className="clear-filters-btn">
                  Clear All Filters
                </button>
              </div>
            </div>

            <div className="stats-card">
              <h3>Your Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <div className="stat-number">{savedJobsCount}</div>
                    <div className="stat-label">Saved Jobs</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon green">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10,9 9,9 8,9"></polyline>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <div className="stat-number">{totalApplications}</div>
                    <div className="stat-label">Applications</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-strength-card">
              <div className="profile-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
                  <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
                  <path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
                  <path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
                </svg>
                <span>Profile Strength</span>
              </div>
              <div className="completion-section">
                <div className="completion-header">
                  <span>Completion</span>
                  <span className="completion-percentage">45%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '45%'}}></div>
                </div>
                <p className="profile-suggestion">Visit your profile to upload your resume</p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="main-content">
            <div className="content-tabs">
              <button 
                className={`tab ${activeTab === 'Browse Jobs' ? 'active' : ''}`}
                onClick={() => setActiveTab('Browse Jobs')}
              >
                Browse Jobs
              </button>
              <button 
                className={`tab ${activeTab === 'Saved Jobs' ? 'active' : ''}`}
                onClick={() => setActiveTab('Saved Jobs')}
              >
                Saved Jobs ({savedJobsCount})
              </button>
              <button 
                className={`tab ${activeTab === 'Applications' ? 'active' : ''}`}
                onClick={() => setActiveTab('Applications')}
              >
                Applications ({totalApplications})
              </button>
            </div>

            {activeTab === 'Applications' ? (
              <div className="applications-section">
                <div className="section-header">
                  <h3>Application Tracker</h3>
                  <span className="jobs-count">{totalApplications} applications</span>
                </div>

                {/* Application Status Cards */}
                <div className="status-cards">
                  <div className="status-card pending">
                    <div className="status-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </div>
                    <div className="status-info">
                      <div className="status-number">{applicationStats.pending}</div>
                      <div className="status-label">Pending</div>
                    </div>
                  </div>

                  <div className="status-card interviews">
                    <div className="status-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </div>
                    <div className="status-info">
                      <div className="status-number">{applicationStats.interviews}</div>
                      <div className="status-label">Interviews</div>
                    </div>
                  </div>

                  <div className="status-card accepted">
                    <div className="status-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22,4 12,14.01 9,11.01"></polyline>
                      </svg>
                    </div>
                    <div className="status-info">
                      <div className="status-number">{applicationStats.accepted}</div>
                      <div className="status-label">Accepted</div>
                    </div>
                  </div>

                  <div className="status-card rejected">
                    <div className="status-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    </div>
                    <div className="status-info">
                      <div className="status-number">{applicationStats.rejected}</div>
                      <div className="status-label">Rejected</div>
                    </div>
                  </div>
                </div>

                {/* Recent Applications Table */}
                <div className="recent-applications">
                  <h3>Recent Applications</h3>
                  <div className="applications-table">
                    <div className="table-header">
                      <div className="col-job">Job Title</div>
                      <div className="col-company">Company</div>
                      <div className="col-date">Applied On</div>
                      <div className="col-status">Status</div>
                    </div>
                    {applications.map((application) => (
                      <div key={application.id} className="table-row">
                        <div className="col-job">{application.jobTitle}</div>
                        <div className="col-company">{application.company}</div>
                        <div className="col-date">{application.appliedOn}</div>
                        <div className="col-status">
                          <span className={`status-badge ${application.status.toLowerCase().replace(' ', '-')}`}>
                            {application.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="internships-section">
                <div className="section-header">
                  <h3>{activeTab === 'Saved Jobs' ? 'Saved Internships' : 'Available Internships'}</h3>
                  <span className="jobs-count">
                    {activeTab === 'Saved Jobs' 
                      ? `${savedJobsCount} saved jobs`
                      : '4 jobs found'
                    }
                  </span>
                </div>
                <p className="section-subtitle">
                  {activeTab === 'Saved Jobs' 
                    ? 'Your saved internship opportunities'
                    : 'Find your perfect internship match'
                  }
                </p>

                <div className="internships-list">
                  {(activeTab === 'Saved Jobs' 
                    ? internships.filter(job => job.isSaved)
                    : internships
                  ).map((internship) => (
                    <div key={internship.id} className="internship-card">
                    <div className="card-header">
                      <div className="company-info">
                        <div className="company-logo">{internship.companyLogo}</div>
                        <div className="job-details">
                          <h4 className="job-title">{internship.title}</h4>
                          <p className="company-name">{internship.company}</p>
                        </div>
                      </div>
                      <div className="card-actions">
                        <div className="match-score">{internship.match} match</div>
                        <button className="save-button">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill={internship.isSaved ? "#ef4444" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="job-meta">
                      <span className="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {internship.location} • {internship.type}
                      </span>
                      <span className="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12,6 12,12 16,14"></polyline>
                        </svg>
                        {internship.salary}
                      </span>
                      <span className="meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {internship.duration}
                      </span>
                    </div>

                    <p className="job-description">{internship.description}</p>

                    <div className="skills-tags">
                      {internship.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>

                    <div className="card-footer">
                      <span className="posted-time">
                        {activeTab === 'Saved Jobs' 
                          ? `Saved ${internship.postedDays} days ago`
                          : `Posted ${internship.postedDays} days ago`
                        }
                      </span>
                      {activeTab === 'Saved Jobs' ? (
                        <button className="remove-button">
                          Remove
                        </button>
                      ) : (
                        <button className="apply-button">
                          Apply Now
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7"></path>
                            <path d="M7 7h10v10"></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
