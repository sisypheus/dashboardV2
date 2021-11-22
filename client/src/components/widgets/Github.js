import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Github = ({display, token}) => {
  return (
    <>
    {display && 
    <div key="github" className="border-2 border-gray-800 dark:bg-gray-600 bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
      <p className="text-xl">Github</p>
    </div>
    }
    </>
  )
}

export default Github
