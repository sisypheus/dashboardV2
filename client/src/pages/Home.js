import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { getDoc, collection, addDoc, doc } from '@firebase/firestore';
import Background from '../utils/Background';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = doc(db, `users/${user.uid}`);
        getDoc(userRef).then(userDoc => {
          setUser(userDoc.data());
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (

      <Background>
        <Navbar />
        <div className="flex">
          <Sidebar user={user} />
          
          {/* <div className="grid grid-cols-5 w-full text-center">
            <p className="dark:text-white col-span-1">Test</p>
            <p className="dark:text-white col-span-1">Test</p>
            <p className="dark:text-white col-span-1">Test</p>
            <p className="dark:text-white col-span-1">Test</p>
            <p className="dark:text-white col-span-1">Test</p>
          </div> */}

          <Widgets user={user} />
        </div>
      </Background>
  )
}

export default Home;