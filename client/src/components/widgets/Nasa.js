import React, { useEffect, useState } from 'react';


const Nasa = ({ display, widget }) => {
  
  useEffect(() => {
    if (display) {
      return getNasa()
    }
  }, []);

  const getNasa = async () => {
  }

  const displayWidget = (widget) => {
    return <p>Wip</p>
  }

  return (
    <>
      { display &&
        <div key="nasa" className="border-2 border-gray-800 dark:bg-gray-600 bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-xl">Nasa</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}

export default Nasa
