import { sampleTemplateData } from "../../data/templateSample";

const DefaultTemplate = ({ data, color }) => {
    return (
        <div className="container p-4">
            {/* Personal Details */}
            <h1 className="text-center" style={{ color }}>
                {data.personal_details?.detail?.firstName} {data.personal_details?.detail?.lastName}
            </h1>
            <p className="text-center text-muted">
                {data.personal_details?.detail?.email} | {data.personal_details?.detail?.phone}
            </p>
            <hr />

            {/* Education */}
            {data.education?.detail?.length > 0 && (
                <section className="mt-3">
                    <h4 style={{ color }}>{data.education?.title}</h4>
                    <div className="border-top border-dark mt-2"></div>
                    {data.education.detail.map((item) => (
                        <div key={item.id} className="mt-2">
                            <p className="fw-semibold">{item.school_name}</p>
                            <p>{item.degree} in {item.branch} ({item.start_year} - {item.end_year})</p>
                            <p className="text-muted">{item.score}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Work Experience */}
            {data.work_experience?.detail?.length > 0 && (
                <section className="mt-3">
                    <h4 style={{ color }}>{data.work_experience?.title}</h4>
                    <div className="border-top border-dark mt-2"></div>
                    {data.work_experience.detail.map((item) => (
                        <div key={item.id} className="mt-2">
                            <p className="fw-semibold">
                                {item.position_title} at {item.company_name} ({item.start_year} - {item.end_year})
                            </p>
                            <div dangerouslySetInnerHTML={{ __html: item.work_summary }}></div>
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {data.projects?.detail?.length > 0 && (
                <section className="mt-3">
                    <h4 style={{ color }}>{data.projects?.title}</h4>
                    <div className="border-top border-dark mt-2"></div>
                    {data.projects.detail.map((item) => (
                        <div className="my-2 p-2" key={item.id}>
                            <p className="fw-semibold fs-6 d-inline-block">{item.project_title}</p>

                            {/* Conditional rendering for links */}
                            {item.project_live_link && (
                                <a href={item.project_live_link} target="_blank" rel="noopener noreferrer" className="fw-medium ms-2" style={{ color }}>
                                    Live
                                </a>
                            )}
                            {item.project_code_link && (
                                <a href={item.project_code_link} target="_blank" rel="noopener noreferrer" className="fw-medium ms-2" style={{ color }}>
                                    Code
                                </a>
                            )}

                            <div dangerouslySetInnerHTML={{ __html: item.project_desc }} className="mt-1"></div>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {data.skills?.detail?.length > 0 && (
                <section className="mt-3">
                    <h4 style={{ color }}>{data.skills?.title}</h4>
                    <div className="border-top border-dark mt-2"></div>
                    <ul>
                        {data.skills.detail.map((skill, index) => <li key={index}>{skill}</li>)}
                    </ul>
                </section>
            )}

            {/* Achievements */}
            {data.achievments?.detail?.length > 0 && (
                <section className="mt-3">
                    <h4 style={{ color }}>{data.achievments?.title}</h4>
                    <div className="border-top border-dark mt-2"></div>
                    <ul className="px-2 my-2 w-100">
                        {data.achievments.detail.map((item) => (
                            <div className="d-flex gap-2 my-1 px-1" key={item.id}>
                                <li className="fw-normal">
                                    <span>{item.awarded_year + " | "}</span> {item.award_name}
                                </li>
                                | <a href={item.certificate_link || "#"} className="fw-normal" target="_blank" rel="noopener noreferrer" style={{ color }}>
                                    {item.awarded_by || "->"}
                                </a>
                            </div>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};

export default DefaultTemplate;
