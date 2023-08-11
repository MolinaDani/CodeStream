import usePreferences from "../hooks/usePreferences"

 
export default function Range({label, property, minValue, maxValue, step}) {

    const { options, changeOption } = usePreferences()

    return (
        <div className='flex items-center justify-between'>
            <h3>{label}</h3>

            <div className='flex items-center gap-3'>
                <span>{options[property]}</span>
                <input type="range" min={minValue} max={maxValue} step={step} defaultValue={options[property]} className='appearance-none w-56 h-2 bg-gray-300 rounded-lg outline-none' onChange={(e) => {
                    changeOption(property, e.target.value)
                }}/>
            </div>
        </div>
    )

}