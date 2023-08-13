 
 export default function Button({children, click, sideTool, textTool, idTool, active = false}) {
    return (
        <button
            data-tooltip-id={idTool} 
            data-tooltip-content={textTool} 
            data-tooltip-place={sideTool} 
            className={`transition-all hover:text-gray-400 ${active ? 'text-blue-600' : ''}`}
                onClick={click}
            >
                {children}
        </button>
    )
 }