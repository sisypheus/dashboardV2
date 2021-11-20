import React, { useEffect, useState } from 'react'

const Github = () => {
  useEffect(() => {
    const url = window.location.href;
    if (url.includes('code')) {
      const code = url.split('code=')[1];
      console.log(code);
    }
  });

  return (
    <div>
      
    </div>
  )
}

export default Github;
