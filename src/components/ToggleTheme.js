import React from 'react'
import { ThemeStates } from '../context/ThemeContext'
import { HiSun, HiMoon } from 'react-icons/hi'

const ToggleTheme = () => {
    const { theme, setTheme } = ThemeStates();
    //console.log(theme)
    return (
        <div>
            {theme === 'dark' ? (
                <div className='flex items-center cursor-pointer' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><HiSun className='text-primary mr-2 text-2xl'></HiSun>Light Mode</div>
            ) : (
                <div className='flex items-center cursor-pointer' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><HiMoon className='text-primary mr-2 text-2xl'></HiMoon>Dark Mode</div>
            )}
        </div>
    )
}

export default ToggleTheme