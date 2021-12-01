import axios from 'axios'
import React, {useEffect, useState} from 'react'

const Intra = ({display, widget, token}) => {
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (display && token) {
      return getIntra()
    }
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
        <div className="flex flex-row space-x-2 font-bold text-purple p-2">
          <p><span className="text-black">GPA : </span>{user.gpa}</p>
          <p><span className="text-black">Credits : </span>{user.credits} C</p>
        </div>
      )
    } else if (widget === 'notifications') {
      const regex = /(<([^>]+)>)/ig;
      return (
        <div className="flex flex-col space-y-2 p-2 px-4 mb-2 overflow-scroll overflow-x-hidden">
          {notifications.map((notif, index) => {
            const res = notif.replace(regex, '');
            return (
              <p className="text-white max-w-prose border-t-2" key={index}>{res}</p>
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
          <p className="text-purple text-2xl tracking-widest font-black">Intranet</p>
          {displayWidget(widget)}
        </div>
      }
    </>
  )
}

export default Intra