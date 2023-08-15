
export default function ButtonWindows({text, srcImg, active, click, activeStyle = 'bg-[#1e1e1e]'}) {
    return (
        <button className={`flex items-center gap-2 px-3 py-[6px] rounded-t-md ${active ? activeStyle : ''} text-sm`} onClick={click}>
            { srcImg ? <img src={srcImg} alt="" className={`w-4 h-4 ${!active ? 'grayscale' : ''}`}/> : null }
            {text}
        </button>
    )
}