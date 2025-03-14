import React from 'react';

const Template4 = ({ data }) => (
  <div className="resume-container professional">
    <header className="professional-header">
      <h1>{data.fullName}</h1>
      <div className="header-details">
        <div className="contact">
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <p>{data.location}</p>
        </div>
        <div className="social">
          {Object.entries(data.additionalLinks || {}).map(([platform, url]) => (
            url && <a key={platform} href={url}>{platform}</a>
          ))}
        </div>
      </div>
    </header>

    <section className="summary">
      <h2>Professional Summary</h2>
      <p>{data.summary || "Experienced professional with demonstrated skills in..."}</p>
    </section>

    <section className="experience">
      <h2>Work Experience</h2>
      {data.experiences.map((exp, i) => (
        <div key={i} className="experience-item">
          <div className="experience-header">
            <h3>{exp.role}</h3>
            <span className="company">{exp.companyName}</span>
            <span className="duration">{exp.timeline}</span>
          </div>
          <ul>
            {exp.responsibilities.map((resp, j) => (
              <li key={j}>{resp}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>

    <div className="bottom-sections">
      <section className="education">
        <h2>Education</h2>
        <div className="education-item">
          <h3>{data.education.degree}</h3>
          <p>{data.education.college}</p>
          <p>{data.education.year}</p>
        </div>
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <div className="skills-list">
          {data.skills.map((skill, i) => (
            <span key={i} className="skill-tag">{skill}</span>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default Template4; 