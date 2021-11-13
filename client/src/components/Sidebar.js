import React from 'react'
import { useHistory } from 'react-router';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const history = useHistory();
  console.log(user);
  return (
    <div style={{ height: 'calc(100vh - 6rem)' }} id="sidebar" className="flex justify-center dark:bg-dark-sidebar border-r-2 dark:border-gray-800 shadow-lg w-64 p-2">
    {user ? (
        <div className="p-2 flex flex-col items-center text-center dark:text-gray-200">
          <p>You are logged in as:</p>
          <p>{user.name}</p>
          <p className="p-4">To personalize your experience, go to <span className="font-bold">your configuration page.</span></p>
          <Link to="/configure">
            <button className="py-2 px-4 bg-blue-500 rounded-lg text-white font-bold">Configure</button>
          </Link>
          <button onClick={() => auth.signOut()} className="py-2 mt-4 px-4 bg-red-600 rounded-lg shadow-lg text-white font-bold">
            Log out
          </button>
        </div>
      ) : (
        <div className="p-2 flex flex-col items-center text-center dark:text-gray-200">
          <p>To personalize your experience, please login.</p>
          <button onClick={() => history.push('/auth')} className="py-2 mt-2 px-4 bg-green-500 rounded-lg shadow-lg text-white font-bold">Log in</button>
        </div>
      )}
    </div>
  )
}

export default Sidebar
