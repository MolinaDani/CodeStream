import { createContext, useState } from "react";

export const PreferencesContext = createContext()

export function PreferencesProvider({children}) {

    const [barPreferences, setBarPreferences] = useState({
        side: 'top'
    })
    const [openPreferences, setOpenPreferences] = useState(false)
    const [theme, setTheme] = useState('vs-dark')

    const [options, setOptions] = useState({
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 18,
        cursorBlinking: 'blink',
        cursorStyle: 'line',
        cursorSmoothCaretAnimation: 'off',
        cursorWidth: 2,
        tabSize: 4,
        minimap: {
            enabled: true,
            scale: 2,
            side: 'rigth'
        },
        automaticLayout: true,
    })

    const changeOption = (property, value) => {
        const newOptions = structuredClone(options)
        newOptions[property] = value
        setOptions(newOptions)
    }

    const changeMinimap = (property, value) => {
        const newOptions = structuredClone(options)
        newOptions.minimap[property] = value
        setOptions(newOptions)
    }

    const changeBarPreferences = (property, value) => {
        const newBarPreferences = structuredClone(barPreferences)
        newBarPreferences[property] = value
        setBarPreferences(newBarPreferences)
    }

    return (
        <PreferencesContext.Provider value={{
            openPreferences,
            setOpenPreferences,
            theme,
            setTheme,
            options,
            changeOption,
            changeMinimap,
            barPreferences,
            changeBarPreferences
        }}>
            {children}
        </PreferencesContext.Provider>
    )
}