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
        <div key="nasa" className="border-2 border-gray-800 dark:bg-gray-600 bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-xl">Youtube Stats</p>
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
        <div key="nasa" className="border-2 border-gray-800 dark:bg-gray-600 bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-xl">Youtube Last</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}
