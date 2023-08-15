import { createContext, useState } from "react";

import { LAYOUTS, THEMES } from '../assets/dictionary'

export const PreferencesContext = createContext()

export function PreferencesProvider({children}) {

    const [barPreferences, setBarPreferences] = useState({ side: 'top' })
    const [layout, setLayout] = useState(LAYOUTS.windows)
    const [theme, setTheme] = useState(THEMES.vsDark)
    const [openPreferences, setOpenPreferences] = useState(false)

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
            changeBarPreferences,
            layout,
            setLayout
        }}>
            {children}
        </PreferencesContext.Provider>
    )
}