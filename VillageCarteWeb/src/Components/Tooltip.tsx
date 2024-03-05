import { ReactNode, useState } from "react";

interface ToolTipProps {
    text: string;
    children: ReactNode;
}

const ToolTip: React.FC<ToolTipProps> = ({ text, children }) => {
    const [showToolTip, setShowToolTip] = useState(false);

    return (
        <div className="relative cursor-help" onMouseEnter={() => setShowToolTip(true)} onMouseLeave={() => setShowToolTip(false)}>
            {children}
            <div className={"w-64 absolute bg-gray-800 text-white p-2 rounded-md bottom-0 left-20 transition-all ease-in-out duration-200 " + (showToolTip ? "" : "hidden")}>
                {text}
            </div>
        </div>
    )
}

export default ToolTip;