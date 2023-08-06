
export default function Select({label, preferences, setPreferences, property, options}) {
    return (
        <div className='flex flex-col gap-2'>
            <span>{label}</span>

            <select className='px-3 py-1 rounded-md border border-gray-400 outline-none w-fit' defaultValue={preferences.options[property]} onChange={(e) => 
                setPreferences({...preferences, options: {...preferences.options, [property]: e.target.value}})
            }>
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </div>  
    )
}