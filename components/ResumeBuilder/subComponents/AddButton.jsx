import { IoAddCircle } from 'react-icons/io5';

const AddButton = (props) => {
    return (
        <div className="fs-4 px-3 w-auto fw-bold mt-4">
            <IoAddCircle {...props} className="text-warning cursor-pointer" size={"40px"} />
        </div>
    );
}

export default AddButton;
