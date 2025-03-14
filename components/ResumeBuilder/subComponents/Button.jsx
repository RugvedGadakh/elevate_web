const Button = ({ text }) => {
    return (
        <button 
            type="button" 
            className="btn btn-warning fw-bold shadow-sm px-3 py-2 rounded"
            style={{
                background: "linear-gradient(to right, #ec4899, #facc15)", 
                border: "none",
                color: "white"
            }}
            onMouseOver={(e) => e.target.style.background = "linear-gradient(to right, #db2777, #3b82f6)"}
            onMouseOut={(e) => e.target.style.background = "linear-gradient(to right, #ec4899, #facc15)"}
        >
            {text || "Build My Resume"}
        </button>
    );
}

export default Button;
