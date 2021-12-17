import { doc, getDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { auth, db } from '../firebase';
import Background from '../utils/Background';

const Home = () => {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = doc(db, `users/${user.uid}`);
        const settingsRef = doc(db, `settings/${user.uid}`);
        getDoc(userRef).then(userDoc => {
          setUser(userDoc.data());
          setUid(userDoc.id);
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
        <Sidebar user={user} setSettings={setSettings} settings={settings} />

        <Widgets settings={settings} uid={uid} />
      </div>
    </Background>
  )
}

export default Home;