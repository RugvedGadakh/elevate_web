import { FaExternalLinkAlt, FaCode, FaCertificate, FaBriefcase, FaGraduationCap, FaTrophy, FaProjectDiagram, FaTools } from "react-icons/fa";

const PremiumTemplate = ({ data, color }) => {
    return (
        <div className="container p-5 shadow-lg rounded border" style={{ backgroundColor: "#fff", maxWidth: "900px", fontFamily: "'Poppins', sans-serif" }}>
            {/* Header Section with Gradient Background */}
            <div className="text-center p-4 rounded" style={{ background: `linear-gradient(135deg, ${color}, #333)`, color: "#fff" }}>
                <h1 className="fw-bold" style={{ fontSize: "2.5rem" }}>
                    {data.personal_details?.detail?.firstName} {data.personal_details?.detail?.lastName}
                </h1>
                <p className="fw-medium">
                    📧 {data.personal_details?.detail?.email} | 📞 {data.personal_details?.detail?.phone}
                </p>
            </div>

            {/* Content Section */}
            <div className="row mt-4">
                {/* Left Column */}
                <div className="col-md-6">
                    {/* Education Section */}
                    {data.education?.detail?.length > 0 && (
                        <section className="mt-4">
                            <h4 className="fw-bold" style={{ color }}><FaGraduationCap className="me-2" />Education</h4>
                            <div className="border-top border-dark mt-2"></div>
                            {data.education.detail.map((item) => (
                                <div key={item.id} className="mt-3">
                                    <p className="fw-semibold fs-5">{item.school_name}</p>
                                    <p>{item.degree} in {item.branch}</p>
                                    <p className="text-muted fw-light">{item.start_year} - {item.end_year} | {item.score}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Skills Section */}
                    {data.skills?.detail?.length > 0 && (
                        <section className="mt-4">
                            <h4 className="fw-bold" style={{ color }}><FaTools className="me-2" />Skills</h4>
                            <div className="border-top border-dark mt-2"></div>
                            <div className="d-flex flex-wrap mt-2">
                                {data.skills.detail.map((skill, index) => (
                                    <span key={index} className="badge bg-dark text-white m-1 p-2">{skill}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Achievements Section */}
                    {data.achievments?.detail?.length > 0 && (
                        <section className="mt-4">
                            <h4 className="fw-bold" style={{ color }}><FaTrophy className="me-2" />Achievements</h4>
                            <div className="border-top border-dark mt-2"></div>
                            <ul className="mt-2 ps-3">
                                {data.achievments.detail.map((item) => (
                                    <li key={item.id} className="mt-2">
                                        <span className="fw-medium">{item.awarded_year} | </span>
                                        <span>{item.award_name}</span> 
                                        {item.certificate_link && (
                                            <> | <a href={item.certificate_link} className="text-decoration-none fw-medium ms-1" target="_blank" rel="noopener noreferrer" style={{ color }}>
                                                <FaCertificate size={14} className="me-1" /> {item.awarded_by || "View Certificate"}
                                            </a></>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                {/* Right Column */}
                <div className="col-md-6">
                    {/* Work Experience Section */}
                    {data.work_experience?.detail?.length > 0 && (
                        <section className="mt-4">
                            <h4 className="fw-bold" style={{ color }}><FaBriefcase className="me-2" />Work Experience</h4>
                            <div className="border-top border-dark mt-2"></div>
                            {data.work_experience.detail.map((item) => (
                                <div key={item.id} className="mt-3">
                                    <p className="fw-semibold fs-5">{item.position_title}</p>
                                    <p className="fw-medium text-muted">{item.company_name} ({item.start_year} - {item.end_year})</p>
                                    <div className="text-muted" dangerouslySetInnerHTML={{ __html: item.work_summary }}></div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Projects Section */}
                    {data.projects?.detail?.length > 0 && (
                        <section className="mt-4">
                            <h4 className="fw-bold" style={{ color }}><FaProjectDiagram className="me-2" />Projects</h4>
                            <div className="border-top border-dark mt-2"></div>
                            {data.projects.detail.map((item) => (
                                <div key={item.id} className="mt-3">
                                    <p className="fw-semibold fs-5">{item.project_title}</p>
                                    <div className="d-flex align-items-center">
                                        {item.project_live_link && (
                                            <a href={item.project_live_link} className="text-decoration-none fw-medium me-3" target="_blank" rel="noopener noreferrer" style={{ color }}>
                                                Live <FaExternalLinkAlt size={12} />
                                            </a>
                                        )}
                                        {item.project_code_link && (
                                            <a href={item.project_code_link} className="text-decoration-none fw-medium" target="_blank" rel="noopener noreferrer" style={{ color }}>
                                                Code <FaCode size={14} />
                                            </a>
                                        )}
                                    </div>
                                    <div className="text-muted mt-1" dangerouslySetInnerHTML={{ __html: item.project_desc }}></div>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PremiumTemplate;
