import axios from 'axios'
import React, {useEffect, useState} from 'react'

const Intra = ({ refresh, display, widget, token}) => {
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (display && token) {
      getIntra()
    }
    const interval = setInterval(() => {
      if (display && token) {
        getIntra()
      }
    }, refresh * 1000 * 60);
    return () => clearInterval(interval);
  }, [])
  
  const getIntra = async () => {
    if (widget === 'stats') {
      const type = 'stats';
      const res = await axios.get(process.env.REACT_APP_API + `/service/intra/${type}?autologin=${token}`);
      setUser(res.data);
    } else if (widget  === 'notifications') {
      const type = 'notifications';
      const res = await axios.get(process.env.REACT_APP_API + `/service/intra/${type}?autologin=${token}`);
      setNotifications(res.data);
    }
  }

  const displayWidget = (widget) => {
    if (widget === 'stats') {
      console.log(user);
      return (
        <div className="flex flex-row space-x-2 text-purple p-2">
          <p><span className="pt-2 text-text">GPA: </span>{user.gpa}</p>
          <p><span className="pt-2 text-text"> & credits: </span>{user.credits}</p>
        </div>
      )
    } else if (widget === 'notifications') {
      const regex = /(<([^>]+)>)/ig;
      return (
        <div className="flex flex-col space-y-2 px-4 my-2 mr-2 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-300">
          {notifications.map((notif, index) => {
            const res = notif.replace(regex, '');
            return (
              <p className="text-justify max-w-prose border-gray-500 border-t text-purple  py-3" key={index}>{res}</p>
            )
          })}
        </div>
      )
    }
  }

  return (
    <>
      { display &&
        <div key="nasa" className="dark:bg-widgets bg-gray-200 shadow-lg h-full w-full rounded-xl flex flex-col items-center justify-center">
          <p className="pt-3 text-purple text-2xl tracking-widest font-black">Intranet</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}

export default Intra