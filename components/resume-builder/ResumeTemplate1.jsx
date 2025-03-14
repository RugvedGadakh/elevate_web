import React from 'react';

const ResumeTemplate1 = ({ data }) => (
  <div className="resume-container template1">
    <header className="resume-header">
      <h1>{data.fullName || "Your Name"}</h1>
      <p className="job-title">{data.jobTitle || "Job Title"}</p>
      <div className="contact-info">
        <p>{data.location || "Location not provided"}</p>
        <p>{data.phone || "Phone not available"}</p>
        <p>{data.email || "Email not provided"}</p>
        <p>{data.website || "Website not provided"}</p>
      </div>
    </header>

    <main className="resume-content">
      <aside className="resume-sidebar">
        <section className="profiles-section">
          <h2>Profiles</h2>
          <ul>
            {data.additionalLinks?.linkedin && (
              <li>
                <span className="profile-name">LinkedIn</span>
                <span className="profile-value">
                  {data.additionalLinks.linkedin.split("/").pop()}
                </span>
              </li>
            )}
            {data.additionalLinks?.github && (
              <li>
                <span className="profile-name">GitHub</span>
                <span className="profile-value">
                  {data.additionalLinks.github.split("/").pop()}
                </span>
              </li>
            )}
          </ul>
        </section>

        <section className="skills-section">
          <h2>Skills</h2>
          <ul>
            {Array.isArray(data.skills) && data.skills.length > 0 ? (
              data.skills.map((skill, index) => (
                <li key={index}>
                  <span className="skill-name">{skill}</span>
                </li>
              ))
            ) : (
              <li>No skills available</li>
            )}
          </ul>
        </section>
      </aside>

      <div className="main-content">
        <section className="experience-section">
          <h2>Experience</h2>
          {Array.isArray(data.experiences) && data.experiences.length > 0 ? (
            data.experiences.map((exp, i) => (
              <div key={i} className="experience-item">
                <h3>{exp.companyName || "Company Name"}</h3>
                <p className="job-title">{exp.role || "Role not specified"}</p>
                <p className="timeline">{exp.timeline || "Timeline not available"}</p>
                <ul className="responsibilities">
                  {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 ? (
                    exp.responsibilities.map((resp, j) => <li key={j}>{resp}</li>)
                  ) : (
                    <li>No responsibilities listed</li>
                  )}
                </ul>
              </div>
            ))
          ) : (
            <p>No experience available</p>
          )}
        </section>

        <section className="education-section">
          <h2>Education</h2>
          {data.education ? (
            <div className="education-item">
              <h3>{data.education.college || "College Name"}</h3>
              <p className="degree">{data.education.degree || "Degree not specified"}</p>
              <p className="timeline">{data.education.year || "Year not provided"}</p>
              <p className="grade">{data.education.cgpa || "Grade not provided"}</p>
            </div>
          ) : (
            <p>No education details available</p>
          )}
        </section>
      </div>
    </main>
  </div>
);

export default ResumeTemplate1; 