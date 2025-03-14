import ToolBar from "./ToolBar";
import { useEffect, useRef, useState } from "react";
import PersonalDetails from "./sections/PersonalDetails";
import WorkExperience from "./sections/WorkExperience";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import Achievments from "./sections/Achievments";
import Skills from "./sections/Skills";
import Others from "./sections/Others";
import { resData } from "./data/resumeData";
import { sections } from "./data/sections";
import { FaCloudDownloadAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ResumePage from "./ResumePage"; // Import ResumePage component

const Editor = () => {
    const colors = ["#000000", "#c33434", "#5a2e7c", "#2a678d"];

    const [selectedColor, setSelectedColor] = useState(() => {
        const storedColor = localStorage.getItem("resumeColor");
        return storedColor ? storedColor : colors[0];
    });

    const [activeSection, setActiveSection] = useState(Object.keys(sections)[0]);

    const [resumeInfo, setResumeInfo] = useState(() => {
        const storedData = localStorage.getItem("resumeData");
        return storedData ? JSON.parse(storedData) : resData;
    });

    const [currValues, setCurrValues] = useState({ ...resumeInfo[activeSection] });
    const [selectedTemplate, setSelectedTemplate] = useState("default");

    useEffect(() => {
        localStorage.setItem("resumeData", JSON.stringify(resumeInfo));
    }, [resumeInfo, activeSection]);
    
    const resumeRef = useRef(null);

    function handleSave(e) {
        e.preventDefault();
        setResumeInfo((prev) => {
            const currSection = activeSection;
            return {
                ...prev,
                [currSection]: {
                    ...currValues
                }
            };
        });
    }

    function handleTitleChange(e) {
        const titleVal = e.target.value;
        setCurrValues((prev) => ({ ...prev, title: titleVal }));
    }

    function tabChange(key) {
        setActiveSection(key);
        setCurrValues(resumeInfo[key]);
    }

    const handleDownload = async () => {
        const element = resumeRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("Resume.pdf");
    };

    return (
        <div className="container-fluid bg-white">
            <ToolBar colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
            <div className="row">
                <div className="col-md-6">
                    <div className="d-flex flex-wrap gap-2 p-3">
                        {Object.keys(sections).map((key) => (
                            <button
                                key={key}
                                onClick={() => tabChange(key)}
                                className={`btn ${activeSection === key ? 'btn-warning' : 'btn-outline-secondary'}`}
                            >
                                {sections[key]}
                            </button>
                        ))}
                    </div>
                    <div>
                        {activeSection === "personal_details" && <PersonalDetails handleSave={handleSave} handleTitleChange={handleTitleChange} setCurrValues={setCurrValues} currValues={currValues} />}
                        {activeSection === "work_experience" && <WorkExperience handleSave={handleSave} handleTitleChange={handleTitleChange} setCurrValues={setCurrValues} currValues={currValues} />}
                        {activeSection === "education" && <Education handleSave={handleSave} handleTitleChange={handleTitleChange} setCurrValues={setCurrValues} currValues={currValues} />}
                        {activeSection === "projects" && <Projects handleSave={handleSave} handleTitleChange={handleTitleChange} setCurrValues={setCurrValues} currValues={currValues} />}
                        {activeSection === "achievments" && <Achievments handleSave={handleSave} handleTitleChange={handleTitleChange} setCurrValues={setCurrValues} currValues={currValues} />}
                        {activeSection === "skills" && <Skills handleSave={handleSave} handleTitleChange={handleTitleChange} setCurrValues={setCurrValues} currValues={currValues} />}
                        {activeSection === "other" && <Others handleSave={handleSave} handleTitleChange={handleTitleChange} setCurrValues={setCurrValues} currValues={currValues} />}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="border p-3 rounded shadow-sm">
                        <div className="d-flex align-items-center">
                            <button onClick={handleDownload} className="btn btn-primary">
                                Download
                            </button>
                            <FaCloudDownloadAlt size={30} className="ms-2 text-primary" />
                        </div>
                    </div>

                    <div className="mt-3">
                        <label className="form-label fw-bold">Select Resume Template:</label>
                        <select 
                            className="form-select"
                            value={selectedTemplate}
                            onChange={(e) => setSelectedTemplate(e.target.value)}
                        >
                            <option value="default">Default Template</option>
                            <option value="modern">Modern Template</option>
                            <option value="elegant">Elegant Template</option>
                            <option value="premium">Premium Template</option>
                        </select>
                    </div>

                    <div className="mt-3 p-3 border rounded shadow-sm" ref={resumeRef}>
                        <ResumePage ref={resumeRef} resumeInfo={resumeInfo} selectedColor={selectedColor} selectedTemplate={selectedTemplate} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
