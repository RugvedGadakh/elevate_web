/* eslint-disable react/prop-types */

const Chips = (props) => {
    const { currValues, setActiveChip, activeChip } = props;

    const handleChipClick = (elemId) => {
        setActiveChip(elemId);
    };

    return (
        <>
            {currValues.detail &&
                currValues.detail.map((elem, idx) => {
                    return (
                        <div
                            key={elem.id}
                            onClick={() => handleChipClick(elem?.id)}
                            className={`d-inline-flex align-items-center gap-2 justify-content-center 
                            p-2 px-4 rounded-pill m-2 border border-2 cursor-pointer 
                            ${activeChip === elem.id ? 'bg-warning text-white' : 'bg-white text-dark'}`}
                        >
                            {currValues.title} {idx + 1}
                        </div>
                    );
                })}
        </>
    );
};

export default Chips;
