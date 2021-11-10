import React from 'react'

const Sidebar = () => {
  return (
    <div style={{height: 'calc(100vh - 6rem)'}} className="flex justify-center dark:bg-dark-sidebar border-r-2 dark:border-gray-800 shadow-lg w-64 p-2">
      <p className="dark:text-gray-200">Bonjour longue phrase</p>
    </div>
  )
}

export default Sidebar
