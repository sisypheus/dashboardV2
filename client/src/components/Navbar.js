import React from 'react'
import useDarkMode from '../utils/darkMode'

const Navbar = () => {
  const [setTheme, colorTheme] = useDarkMode();

  return (
    <nav className="h-24 relative bg-blue-800 dark:bg-dark-nav text-gray-200 flex items-center justify-center"> 
      <div className="mr-auto justify-self-start pl-12 opacity-0">
        <p>Test</p>
      </div>
      <div className="font-sans tracking-wider font-semibold text-3xl">
        <p>Dashboard</p>
      </div>
      <div onClick={() => setTheme(colorTheme)} className="ml-auto justify-self-end pr-12 cursor-pointer">
        <div className="cursor-pointer text-white rounded-full shadow-lg flex items-center bg-gray-700 p-2">
          {colorTheme === 'dark' ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
