/* eslint-disable react/prop-types */

const InfoBox = (props) => {
    const { infoDesc, infoTitle, icon } = props;

    return (
        <div className="border rounded shadow-sm p-4" style={{ width: "350px", height: "550px" }}>
            <div className="text-center w-100 h-50 overflow-hidden">
                <img src={icon} alt="infoicons" className="h-100 mx-auto cursor-pointer" />
            </div>
            <div className="my-4 p-2">
                <p className="fw-bold fs-4 my-3">
                    {infoTitle}
                </p>
                <p className="fw-semibold fs-5">
                    {infoDesc}
                </p>
            </div>
        </div>
    );
}

export default InfoBox;
