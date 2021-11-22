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
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = doc(db, `users/${user.uid}`);
        const settingsRef = doc(db, `settings/${user.uid}`);
        getDoc(userRef).then(userDoc => {
          setUser(userDoc.data());
        });
        getDoc(settingsRef).then(settingsDoc => {
          setSettings(settingsDoc.data());
        })
      } else {
        setUser(null);
        setSettings(null);
      }
    });
  }, []);

  return (
    <Background>
      <Navbar />
      <div className="flex">
        <Sidebar user={user} />

        <Widgets settings={settings} />
      </div>
    </Background>
  )
}

export default Home;