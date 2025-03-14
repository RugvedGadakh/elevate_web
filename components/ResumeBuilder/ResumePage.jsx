import { forwardRef, useEffect, useState } from "react";
import { sampleTemplateData } from "./data/templateSample";
import { resumeTemplates } from "./data/resumeTemplates"; // Import templates

const ResumePage = forwardRef(function ResumePage(props, ref) {
    const { resumeInfo, selectedColor, selectedTemplate } = props;
    const [data, setData] = useState(sampleTemplateData);
    const [color, setColor] = useState(selectedColor);
    
    useEffect(() => {
        setData(resumeInfo);
    }, [resumeInfo]);

    useEffect(() => {
        localStorage.setItem("resumeColor", selectedColor);
        setColor(selectedColor);
    }, [selectedColor]);

    // Render the selected template
    const TemplateComponent = resumeTemplates[selectedTemplate] || resumeTemplates["default"];

    return (
        <div ref={ref} className="container bg-white p-4 overflow-auto" style={{ scrollbarWidth: "none" }}>
            <TemplateComponent data={data} color={color} />
        </div>
    );
});

export default ResumePage;
