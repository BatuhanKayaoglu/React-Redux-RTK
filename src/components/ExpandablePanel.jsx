import { useState } from "react";
import { GoChevronLeft, GoChevronDown } from "react-icons/go";

const ExpandablePanel = ({ children, header }) => {

    const [expanded, setExpanded] = useState(false)

    const handleClick = () => {
        setExpanded(!expanded)
    }

    return (
        <div className="panelDiv">
            <div className="topArrangement">
                <div>{header}</div>
                <div onClick={handleClick} style={{ cursor: "pointer" }}>
                    {expanded ? <GoChevronDown /> : <GoChevronLeft />}
                </div>
            </div>
            {expanded && <div>{children}</div>}
        </div>
    )
}

export default ExpandablePanel