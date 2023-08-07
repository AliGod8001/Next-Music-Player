import { create } from 'zustand'

const STORAGE_NAME = process.env.NEXT_PUBLIC_THEME_STORE

const changeThemeLocalStorage = (dark: string) => {
    if ( typeof window !== 'undefined' ) {
        localStorage.setItem(STORAGE_NAME, dark)
    }
}

export const useThemeStore = create<ThemeStoreState>() ((set) => ({
    darkMode: false,
    setInitialDarkMode: (dark: boolean) => {
        set(() => ({
            darkMode: dark
        }))
    },
    toggleDarkMode: () => {
        if ( useThemeStore.getState().darkMode ) {
            document.querySelector('.dark').classList.add('light')
            document.querySelector('.light').classList.remove('dark')
        } else {
            document.querySelector('.light').classList.add('dark')
            document.querySelector('.dark').classList.remove('light')
        }

        set(state => ({ darkMode: !state.darkMode }))
        changeThemeLocalStorage(useThemeStore.getState().darkMode ? "true" : "false")
    }
}))