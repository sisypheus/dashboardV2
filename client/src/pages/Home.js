import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { getDoc, collection, addDoc, doc } from '@firebase/firestore';

const Home = () => {
  const [user, setUser ] = useState(null);

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
    <>
      <div>
        <p>Home Page</p>
      </div>
      {user ? (
        <div>
          <p>{user.email}</p>
          <p>{user.name}</p>
          <button onClick={() => auth.signOut()} className="border-2 bg-red-600 px-4 py-2 rounded-xl">Sign Out</button>
        </div>
      ) : (
        <div>
          <Link to="/auth">
            <button className="border-2 bg-blue-400 px-4 py-2 rounded-lg">Sign In</button>
          </Link>
        </div>
      )}
    </>
  )
}

export default Home;