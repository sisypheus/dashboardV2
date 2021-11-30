import React, {useEffect, useState} from 'react'

export const YoutubeStats = ({display, widget, token}) => {

  
  useEffect(() => {
    if (display) {
      return getYoutube()
    }
  }, [])
  
  const getYoutube = () => {

  }

  const displayWidget = () => {
    return <p>Wip</p>
  }

  return (
    <>
      { display &&
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-blue text-2xl tracking-widest font-black">Youtube Stats</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}

export const YoutubeLast = ({display, widget, token}) => {

  useEffect(() => {
    if (display) {
      return getYoutube()
    }
  }, [])

  const getYoutube = () => {

  }

  const displayWidget = () => {

  }

  return (
    <>
      { display &&
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-saumon text-2xl tracking-widest font-black">Youtube Last</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}
