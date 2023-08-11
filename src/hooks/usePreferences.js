import { useContext } from "react";
import { PreferencesContext } from "../context/preferencesContext";

export default function usePreferences() {
    const preferences = useContext(PreferencesContext)

    if (preferences === undefined) {
        throw new Error('usePreferences must be used within a preferencesProvider')
    }
    return preferences
}