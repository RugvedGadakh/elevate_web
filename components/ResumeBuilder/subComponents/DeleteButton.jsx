import { MdDeleteForever } from "react-icons/md";

const DeleteButton = (props) => {
    return (
        <div 
            {...props} 
            className="d-flex align-items-center justify-content-between p-3 my-4 mx-5 mb-4 text-white fw-bold bg-danger rounded cursor-pointer"
            style={{ width: "100px" }}
            onMouseOver={(e) => e.target.style.background = "#c82333"}
            onMouseOut={(e) => e.target.style.background = "#dc3545"}
        >
            Delete 
            <MdDeleteForever />
        </div>
    );
}

export default DeleteButton;
