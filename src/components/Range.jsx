 
export default function Range({label, preferences, setPreferences, property, minValue, maxValue, step}) {

    return (
        <div className='flex items-center justify-between'>
            <h3>{label}</h3>

            <div className='flex items-center gap-3'>
                <span>{preferences.options[property]}</span>
                <input type="range" min={minValue} max={maxValue} step={step} defaultValue={preferences.options[property]} className='appearance-none w-56 h-2 bg-gray-300 rounded-lg outline-none' onChange={(e) => {
                    setPreferences({...preferences, options: {...preferences.options, [property]: e.target.value}})
                }}/>
            </div>
        </div>
    )

}