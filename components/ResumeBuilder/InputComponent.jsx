/* eslint-disable react/prop-types */

const InputComponent = ({ id, label, ...props }) => {
    return (
        <div className="d-flex flex-column p-3 w-100" style={{ minWidth: '270px', gap: '1rem' }}>
            {label && <label htmlFor={id} className="px-3 fw-semibold text-secondary">{label}</label>}
            <input {...props} className="form-control border-2" />
        </div>
    );
};

export default InputComponent;
