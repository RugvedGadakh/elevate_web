/* eslint-disable react/prop-types */
const ToolBar = (props) => {
    const { colors, selectedColor, setSelectedColor } = props;

    return (
        <div className="d-flex flex-wrap align-items-center justify-content-evenly my-3 p-3 rounded-3 border border-2 shadow-sm">
            <div className="d-flex gap-3 flex-wrap align-items-center justify-content-center">
                {colors.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => setSelectedColor(item)}
                        className={`cursor-pointer rounded-circle border border-2 ${item === selectedColor ? "border-primary border-4" : ""}`} 
                        style={{ backgroundColor: item, width: "40px", height: "40px", cursor: "pointer" }}>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ToolBar;
