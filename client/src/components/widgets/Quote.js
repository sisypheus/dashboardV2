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
        <div key="nasa" className="border-2 border-gray-800 dark:bg-gray-600 bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-xl">Quote random</p>
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

  }

  return (
    <>
      { display &&
        <div key="nasa" className="border-2 border-gray-800 dark:bg-gray-600 bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-xl">Quote qod</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}