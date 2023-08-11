
//icons
import { BsCursorText, BsFillGearFill, BsXLg } from "react-icons/bs"
import { GrTextAlignLeft } from "react-icons/gr"
import { GoSidebarCollapse } from "react-icons/go"

//components
import Range from "./Range"
import Select from "./Select"

//hooks
import usePreferences from "../hooks/usePreferences"

export default function Modal() {

    const { openPreferences, setOpenPreferences, changeMinimap, theme, setTheme, options, changeOption } = usePreferences()

    return (
        <div className={`absolute top-0 left-0 w-full h-full bg-[#000000ab] backdrop-blur-sm grid place-items-center transition-all duration-200 ${openPreferences ? 'z-50 opacity-100' : 'opacity-0 -z-50'}`} onClick={() => setOpenPreferences(prevState => !prevState)}>
            <article className='min-w-[95%] md:min-w-[75%] lg:min-w-[50%] max-h-[85%] px-8 bg-white rounded-xl flex flex-col gap-3 text-gray-800 relative overflow-x-hidden' onClick={(e) => e.stopPropagation()}>

                <div className="flex items-center justify-between py-4 bg-white sticky top-0 left-0 border-b border-b-gray-300">
                    <h1 className='text-xl font-montserratBold'>Preferencias</h1> 
                    <BsXLg size={'1.2rem'} className="cursor-pointer" onClick={() => setOpenPreferences(prevState => !prevState)}/>
                </div>

                <h2 className='text-lg flex items-center gap-2'><GrTextAlignLeft size={'0.9rem'} /> Texto:</h2>
                <section className='px-3 flex flex-col gap-2 text-sm py-3 border rounded-md border-gray-300'>

                    <Range 
                        label={'Tamaño de fuente:'} 
                        property={'fontSize'} 
                        minValue={8}
                        maxValue={36}
                        step={1}
                    />

                    <Range 
                        label={'Interletrado:'} 
                        property={'letterSpacing'} 
                        minValue={0}
                        maxValue={6}
                        step={0.1}
                    />

                    <Range 
                        label={'Interlineado:'} 
                        property={'lineHeight'} 
                        minValue={15}
                        maxValue={40}
                        step={1}
                    />

                </section>

                <h2 className='text-lg flex items-center gap-2'><BsCursorText size={'1rem'} /> Cursor:</h2>
                <section className='px-3 grid grid-cols-2 grid-rows-2 gap-4 text-sm py-3 border rounded-md border-gray-300'>

                    <Select
                        label={'Parpadeo del cursor:'} 
                        property={'cursorBlinking'}
                        options={[
                            { label: 'Normal', value: 'blink' },
                            { label: 'Suave', value: 'smooth' },
                            { label: 'Fase', value: 'phase' },
                            { label: 'Expansión', value: 'expand' },
                            { label: 'Sólido', value: 'solid' }
                        ]}
                    />

                    <Select
                        label={'Estilo del cursor:'} 
                        property={'cursorStyle'}
                        options={[
                            { label: 'Linea', value: 'line' },
                            { label: 'Subrayado', value: 'underline' },
                            { label: 'Bloque', value: 'block' },
                            { label: 'Linea fina', value: 'line-thin' },
                            { label: 'Subrayado fino', value: 'underline-thin' },
                            { label: 'Bloque contorno', value: 'block-outline' }
                        ]}
                    />

                    <Select
                        label={'Animación de intercalación:'} 
                        property={'cursorSmoothCaretAnimation'}
                        options={[
                            { label: 'Activado', value: 'on' },
                            { label: 'Desactivado', value: 'off' },
                            { label: 'Explícito', value: 'explicit' },
                        ]}
                    /> 

                    <div className='flex flex-col gap-2'>
                        <span>Ancho del cursor:</span>
                        <div className='flex items-center gap-2'>
                            <span>{options.cursorWidth}</span>
                            <input type="range" min={1} max={10} step={1} defaultValue={options.cursorWidth} className='appearance-none w-32 h-2 bg-gray-300 rounded-lg outline-none' onChange={(e) => {
                                changeOption('cursorWidth', e.target.value)
                            }}/>
                        </div>
                    </div>  

                </section>
                
                <div className="flex items-center justify-between">
                    <h2 className='text-lg flex items-center gap-2'><GoSidebarCollapse size={'1rem'} /> Minimapa:</h2>
                    
                    <div className="flex items-center gap-2">
                        <input id="enabledMinimap" type="checkbox" checked={options.minimap.enabled} onChange={(e) => 
                            changeMinimap('enabled', e.target.checked)
                        }/>
                        <label htmlFor="enabledMinimap" className="text-sm">Mostrar</label>    
                    </div>

                </div>

                <section className={`px-3 grid grid-cols-2 gap-4 text-sm py-3 border rounded-md border-gray-300 ${!options.minimap.enabled ? 'hidden' : ''}`}>

                    <div className='flex flex-col gap-2'>
                        <span>Posición:</span>

                        <select className='px-3 py-1 rounded-md border border-gray-400 outline-none w-fit' defaultValue={options.minimap.side} onChange={(e) =>
                            changeMinimap('side', e.target.value)
                        }>
                            <option value='rigth'>Derecha</option>
                            <option value='left'>Izquierda</option>
                        </select>
                    </div>  

                    <div className='flex flex-col gap-2'>
                        <span>Escala:</span>
                        <div className='flex items-center gap-2'>
                            <span>{options.minimap.scale}</span>

                            <input type="range" min={1} max={3} step={1} defaultValue={options.minimap.scale} className='appearance-none w-20 h-2 bg-gray-300 rounded-lg outline-none' onChange={(e) => {
                                changeMinimap('scale', e.target.value)
                            }}/>
                        </div>
                    </div>  

                </section>

                <h2 className='text-lg flex items-center gap-2'><BsFillGearFill size={'1rem'} /> Otros:</h2>

                <section className='px-3 flex flex-col gap-2 text-sm py-3 border rounded-md border-gray-300 mb-6'>
                    <Range 
                        label={'Tamaño de la tabulación:'} 
                        property={'tabSize'} 
                        minValue={1}
                        maxValue={12}
                        step={1}
                    />

                    <div className='flex items-center gap-4'>
                        <span>Tema:</span>

                        <select className='px-3 py-1 rounded-md border border-gray-400 outline-none w-fit' defaultValue={theme} onChange={(e) =>
                            setTheme(e.target.value)
                        }>
                            <option value='vs'>Vs</option>
                            <option value='vs-dark'>Vs-Dark</option>
                            <option value='hc-black'>Hc-Black</option>
                            <option value='vs-light'>Vs-Light</option>
                        </select>
                    </div>  
                    
                </section>

            </article>
        </div>
    )
}