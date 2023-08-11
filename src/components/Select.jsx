import usePreferences from "../hooks/usePreferences"

export default function Select({label, property, options: selectOptions}) {

    const { options, changeOption } = usePreferences()

    return (
        <div className='flex flex-col gap-2'>
            <span>{label}</span>

            <select className='px-3 py-1 rounded-md border border-gray-400 outline-none w-fit' defaultValue={options[property]} onChange={(e) => 
                changeOption(property, e.target.value)
            }>
                {selectOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </div>  
    )
}