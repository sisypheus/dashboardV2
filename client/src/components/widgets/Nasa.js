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
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-blue text-2xl tracking-widest font-black">Nasa</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}

export default Nasa
