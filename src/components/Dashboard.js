import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';

// IconButton Component for cleaner SVG buttons
const IconButton = ({ children, onClick, className }) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);

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

  const userEmail = location.state?.userEmail || 'user@example.com';
  const userData = {
    username: userEmail.split('@')[0],
    email: userEmail,
    avatar: userEmail.charAt(0).toUpperCase()
  };

  // Sample notifications with interactivity
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New internship match", message: "Google Data Science internship matches your profile", time: "2 hours ago", type: "match", isRead: false },
    { id: 2, title: "Application update", message: "Your application to Microsoft has been reviewed", time: "1 day ago", type: "application", isRead: false },
    { id: 3, title: "Profile completion", message: "Complete your profile to get better matches", time: "3 days ago", type: "profile", isRead: true }
  ]);

  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const markAsRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));

  // Sample internships
  const [internships, setInternships] = useState([
    { id: 1, title: 'Data Science Intern', company: 'DataFlow Inc', companyLogo: 'DF', location: 'Mumbai', type: 'Hybrid', salary: '₹18,000', duration: '6 months', match: '85%', description: 'Analyze large datasets and build ML models', skills: ['Python', 'Machine Learning', 'SQL'], postedDays: 2, isSaved: false },
    { id: 2, title: 'UI/UX Design Intern', company: 'DesignStudio', companyLogo: 'DS', location: 'Delhi', type: 'Full-time', salary: '₹12,000', duration: '4 months', match: '78%', description: 'Create user-centered designs for mobile and web', skills: ['Figma', 'Adobe XD', 'Prototyping'], postedDays: 2, isSaved: true },
    { id: 3, title: 'Backend Developer Intern', company: 'CloudTech', companyLogo: 'CT', location: 'Hyderabad', type: 'Full-time', salary: '₹16,000', duration: '3 months', match: '88%', description: 'Build scalable APIs and microservices', skills: ['Node.js', 'MongoDB', 'AWS'], postedDays: 2, isSaved: false },
    { id: 4, title: 'Frontend Developer Intern', company: 'TechCorp', companyLogo: 'TC', location: 'Bangalore', type: 'Remote', salary: '₹15,000', duration: '3 months', match: '92%', description: 'Work on React.js applications with modern technologies', skills: ['React', 'JavaScript', 'HTML/CSS'], postedDays: 2, isSaved: true }
  ]);

  const toggleSave = (id) => setInternships(prev => prev.map(job => job.id === id ? { ...job, isSaved: !job.isSaved } : job));

  const handleInternshipTypeChange = (type) => setInternshipType(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);

  const applyFilters = () => console.log('Applying filters:', { locationFilter, internshipType, stipendRange, duration });
  const clearFilters = () => { setLocationFilter('Location'); setInternshipType([]); setStipendRange([0, 20000]); setDuration(''); };
  const handleSearch = () => console.log('Searching for:', searchQuery, locationFilter);

  const savedJobsCount = internships.filter(job => job.isSaved).length;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left"><h1 className="app-logo">InternshipAI</h1></div>
        <nav className="header-nav">
          <button className="nav-link active" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="nav-link" onClick={() => navigate('/profile')}>Profile</button>
        </nav>
        <div className="header-actions">
          <div className="user-profile">
            <div className="notification-wrapper">
              <IconButton className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
                Notifications {notifications.filter(n => !n.isRead).length > 0 && <span className="notification-dot"></span>}
              </IconButton>
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <span>{notifications.filter(n => !n.isRead).length} new</span>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(n => (
                      <div key={n.id} className={`notification-item ${!n.isRead ? 'unread' : ''}`} onClick={() => markAsRead(n.id)}>
                        <h4>{n.title}</h4>
                        <p>{n.message}</p>
                        <span>{n.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="notifications-footer">
                    <button onClick={markAllAsRead}>Mark all as read</button>
                  </div>
                </div>
              )}
            </div>
            <div className="user-info">
              <span className="user-avatar">{userData.avatar}</span>
              <div className="user-details"><span>{userData.email}</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="dashboard-main">
        <div className="welcome-section">
          <h2>Welcome back, {userData.username}!</h2>
        </div>

        {/* Search */}
        <div className="search-section">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option>Location</option><option>Bangalore</option><option>Mumbai</option><option>Delhi</option><option>Hyderabad</option><option>Remote</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Internships */}
        <div className="internships-list">
          {internships.map(job => (
            <div key={job.id} className="internship-card">
              <h4>{job.title} ({job.company})</h4>
              <p>{job.description}</p>
              <button onClick={() => toggleSave(job.id)}>{job.isSaved ? 'Unsave' : 'Save'}</button>
              <button>Apply Now</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

