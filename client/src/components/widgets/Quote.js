import React, {useEffect, useState} from 'react'

export const QuoteRandom = ({display, widget, token}) => {

  useEffect(() => {
    if (display) {
      return getQuote()
    }
  }, [])
  
  const getQuote = () => {

  }

  const displayWidget = () => {
    return <p>Wip</p>
  }

  return (
    <>
      { display &&
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-saumon text-2xl tracking-widest font-black">Quote random</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}

export const QuoteDay = ({display, widget, token}) => {

  useEffect(() => {
    if (display) {
      return getQuote()
    }
  }, [])

  const getQuote = () => {

  }

  const displayWidget = () => {
    return <p>Wip</p>
  }

  return (
    <>
      { display &&
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-orange text-2xl tracking-widest font-black">Quote of the day</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}