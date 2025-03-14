import React from 'react';

const Template2 = ({ data }) => (
  <div className="resume-container minimal">
    <header className="minimal-header">
      <h1>{data.fullName}</h1>
      <div className="contact-row">
        <span>{data.email}</span>
        <span>{data.phone}</span>
        <span>{data.location}</span>
      </div>
      <div className="social-links">
        {Object.entries(data.additionalLinks || {}).map(([platform, url]) => (
          url && <a key={platform} href={url}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</a>
        ))}
      </div>
    </header>

    <div className="content-grid">
      <section className="education-section">
        <h2>Education</h2>
        <div className="education-card">
          <h3>{data.education.degree}</h3>
          <p className="college">{data.education.college}</p>
          <p className="university">{data.education.university}</p>
          <div className="education-meta">
            <p className="year">{data.education.year}</p>
            <p className="grade">{data.education.cgpa}</p>
          </div>
        </div>
      </section>

      <section className="experience-section">
        <h2>Professional Experience</h2>
        {data.experiences.map((exp, i) => (
          <div key={i} className="experience-card">
            <div className="experience-header">
              <h3>{exp.role}</h3>
              <p className="company">{exp.companyName}</p>
              <p className="timeline">{exp.timeline}</p>
            </div>
            <ul className="responsibilities">
              {exp.responsibilities.map((resp, j) => (
                <li key={j}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <div className="sidebar-grid">
        <section className="skills-section">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            {data.skills.map((skill, i) => (
              <span key={i} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>

        <section className="languages-section">
          <h2>Languages</h2>
          <div className="language-grid">
            {data.languages.map((lang, i) => (
              <span key={i} className="language-tag">{lang}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
);

export default Template2; 