import React, { useEffect, useState } from 'react'
import Background from '../utils/Background';
import Navbar from '../components/Navbar';
import { auth, db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useHistory } from 'react-router';

const Configure = () => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = doc(db, `users/${user.uid}`);
        getDoc(userRef).then(userDoc => {
          setUser(userDoc.data());
        });
      } else {
        history.push('/login');
      }
    })
  }, [])

  return (
    <Background>
      <Navbar />
      <div className="flex flex-col items-center justify-center max-w-2xl m-auto">
        <div className="mt-6 text-2xl dark:text-gray-200 font-bold border-b-4 dark:border-gray-500">
          Settings
        </div>
        <div className="dark:text-gray-200 w-full">
          <div className="pl-2 text-lg mt-6 font-bold">Weather Service</div>
          <div className="border-b-2 w-full border-gray-700 mt-1 mb-3"></div>
          <div className="max-w-sm pl-6 font-mono">
            <div className="flex items-center justify-between">
              <div>Display widget</div>
              <input type="checkbox" className="checked:text-green-500 rounded w-4 h-4" />
            </div>
            <div></div>
            <div className="pl-4">City</div>
          </div>
        </div>
      </div>


    </Background>
  )
}

export default Configure
