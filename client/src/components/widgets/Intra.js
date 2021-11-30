import React, {useEffect, useState} from 'react'

const Intra = ({display, widget, token}) => {

  useEffect(() => {
    if (display && token) {
      return getIntra()
    }
  }, [])
  
  const getIntra = async () => {

  }

  const displayWidget = (widget) => {
    return <p>Wip</p>
  }

  return (
    <>
      { display &&
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-purple text-2xl tracking-widest font-black">Intranet</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}

export default Intra