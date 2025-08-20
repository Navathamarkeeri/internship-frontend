import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    // Basic Information
    fullName: 'Navatha Markeeri',
    email: 'navatha@example.com',
    phone: '+91 9876543210',
    location: 'Bangalore, India',
    
    // Education
    degree: 'Bachelor of Technology',
    college: 'Indian Institute of Technology',
    graduationYear: '2025',
    specialization: 'Computer Science Engineering',
    
    // Skills
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'React', 'SQL', 'TensorFlow'],
    
    // Experience
    experience: [
      {
        id: 1,
        title: 'Data Science Intern',
        company: 'TechCorp Solutions',
        duration: 'Jun 2024 - Aug 2024',
        description: 'Developed machine learning models for customer segmentation and improved prediction accuracy by 25%.'
      }
    ],
    
    // Projects
    projects: [
      {
        id: 1,
        title: 'AI Internship Finder',
        techStack: ['React', 'Node.js', 'MongoDB', 'Machine Learning'],
        githubLink: 'https://github.com/navatha/ai-internship-finder',
        portfolioLink: 'https://navatha-portfolio.com/projects/ai-finder'
      },
      {
        id: 2,
        title: 'Stock Price Predictor',
        techStack: ['Python', 'TensorFlow', 'Pandas', 'Flask'],
        githubLink: 'https://github.com/navatha/stock-predictor',
        portfolioLink: ''
      }
    ],
    
    // Resume
    resumeFile: null,
    resumeFileName: ''
  });

  const [newSkill, setNewSkill] = useState('');

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    const fields = [
      profileData.fullName,
      profileData.email,
      profileData.phone,
      profileData.location,
      profileData.degree,
      profileData.college,
      profileData.graduationYear,
      profileData.specialization,
      profileData.skills.length > 0,
      profileData.experience.length > 0,
      profileData.projects.length > 0,
      profileData.resumeFile
    ];
    
    const completedFields = fields.filter(field => field && field !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setProfileData(prev => ({
        ...prev,
        resumeFile: file,
        resumeFileName: file.name
      }));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile saved:', profileData);
  };

  const profileCompletion = calculateProfileCompletion();

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Back Navigation */}
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="profile-header">
          <div className="profile-title">
            <h1>My Profile</h1>
            <p>Manage your personal information and preferences</p>
          </div>
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button className="save-btn" onClick={handleSave}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17,21 17,13 7,13 7,21"></polyline>
                    <polyline points="7,3 7,8 15,8"></polyline>
                  </svg>
                  Save Changes
                </button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Strength */}
        <div className="profile-strength-section">
          <div className="strength-header">
            <h3>Profile Strength</h3>
            <span className="completion-percentage">{profileCompletion}% Complete</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
          <p className="strength-message">
            {profileCompletion === 100 
              ? "Your profile is complete! You'll get the best internship matches."
              : `Complete ${100 - profileCompletion}% more to improve your match quality.`
            }
          </p>
        </div>

        <div className="profile-content">
          {/* Basic Information */}
          <div className="profile-section">
            <h3 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Basic Information
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled={true}
                  className="readonly-field"
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="profile-section">
            <h3 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
              Education
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Degree</label>
                <input
                  type="text"
                  value={profileData.degree}
                  onChange={(e) => handleInputChange('degree', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>College/University</label>
                <input
                  type="text"
                  value={profileData.college}
                  onChange={(e) => handleInputChange('college', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Graduation Year</label>
                <input
                  type="text"
                  value={profileData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>Specialization</label>
                <input
                  type="text"
                  value={profileData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="profile-section">
            <h3 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              Skills
            </h3>
            <div className="skills-container">
              <div className="skills-list">
                {profileData.skills.map((skill, index) => (
                  <div key={index} className="skill-tag">
                    <span>{skill}</span>
                    {isEditing && (
                      <button 
                        className="remove-skill"
                        onClick={() => removeSkill(skill)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="add-skill">
                  <input
                    type="text"
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button onClick={addSkill} className="add-skill-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Experience */}
          <div className="profile-section">
            <h3 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              Experience
            </h3>
            <div className="experience-list">
              {profileData.experience.map((exp) => (
                <div key={exp.id} className="experience-item">
                  <div className="experience-header">
                    <h4>{exp.title}</h4>
                    <span className="duration">{exp.duration}</span>
                  </div>
                  <p className="company">{exp.company}</p>
                  <p className="description">{exp.description}</p>
                </div>
              ))}
              {isEditing && (
                <button className="add-experience-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Experience
                </button>
              )}
            </div>
          </div>

          {/* Projects */}
          <div className="profile-section">
            <h3 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              Projects
            </h3>
            <div className="projects-list">
              {profileData.projects.map((project) => (
                <div key={project.id} className="project-item">
                  <div className="project-header">
                    <h4>{project.title}</h4>
                    <div className="project-links">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                          GitHub
                        </a>
                      )}
                      {project.portfolioLink && (
                        <a href={project.portfolioLink} target="_blank" rel="noopener noreferrer" className="project-link">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15,3 21,3 21,9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="tech-stack">
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
              {isEditing && (
                <button className="add-project-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Project
                </button>
              )}
            </div>
          </div>

          {/* Resume Upload */}
          <div className="profile-section">
            <h3 className="section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              Resume
            </h3>
            <div className="resume-upload">
              {profileData.resumeFileName ? (
                <div className="resume-file">
                  <div className="file-info">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                    </svg>
                    <span className="file-name">{profileData.resumeFileName}</span>
                  </div>
                  {isEditing && (
                    <button className="remove-file" onClick={() => handleInputChange('resumeFileName', '')}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                      </svg>
                    </button>
                  )}
                </div>
              ) : (
                <div className="upload-area">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7,10 12,15 17,10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <p>Upload your resume</p>
                  <p className="upload-hint">PDF or DOCX format, max 5MB</p>
                  {isEditing && (
                    <label className="upload-btn">
                      <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleResumeUpload}
                        style={{ display: 'none' }}
                      />
                      Choose File
                    </label>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
