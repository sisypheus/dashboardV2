import React, {useEffect, useState} from 'react'

const Intra = ({display, widget, token}) => {

  useEffect(() => {
    if (display) {
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
        <div key="nasa" className="border-2 border-gray-800 dark:bg-gray-600 bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-xl">Intra</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}

export default Intra