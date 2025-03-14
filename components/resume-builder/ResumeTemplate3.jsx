import React from 'react';

const Template3 = ({ data }) => (
  <div className="resume-container creative">
    <header className="creative-header">
      <h1>{data.fullName}</h1>
      <div className="contact-info">
        <p>{data.email} | {data.phone}</p>
        <p>{data.location}</p>
      </div>
    </header>
    
    <div className="two-column-layout">
      <aside className="left-column">
        <section className="skills">
          <h2>Skills</h2>
          <div className="skills-list">
            {data.skills.map((skill, i) => (
              <div key={i} className="skill-item">{skill}</div>
            ))}
          </div>
        </section>
        
        <section className="education">
          <h2>Education</h2>
          <div className="education-item">
            <h3>{data.education.degree}</h3>
            <p>{data.education.college}</p>
            <p>{data.education.year}</p>
            <p>{data.education.cgpa}</p>
          </div>
        </section>
      </aside>

      <main className="right-column">
        <section className="experience">
          <h2>Experience</h2>
          {data.experiences.map((exp, i) => (
            <div key={i} className="experience-item">
              <h3>{exp.role}</h3>
              <p className="company">{exp.companyName}</p>
              <p className="duration">{exp.timeline}</p>
              <ul>
                {exp.responsibilities.map((resp, j) => (
                  <li key={j}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
    </div>
  </div>
);

export default Template3; 