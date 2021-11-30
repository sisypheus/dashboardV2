import React, {useEffect, useState} from 'react'

const Reddit = ({display, subreddit, posts, token}) => {

  
  useEffect(() => {
    if (display) {
      return getReddit()
    }
  }, [])
  
  const getReddit = async () => {
    //refresh token

  }

  const displayWidget = () => {
    return <p>Wip</p>
  }

  return (
    <>
      { display &&
        <div key="nasa" className="border-2 border-gray-800 dark:bg-gray-600 bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="text-xl">Reddit</p>
          {displayWidget()}
        </div>
      }
    </>
  )
}

export default Reddit

