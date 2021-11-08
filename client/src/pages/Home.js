import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const Home = () => {
  const [ user, setUser ] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user); 
    });
  }, []);

  console.log(auth.currentUser);
  return (
    <>
      <div>
        <p>Home Page</p>
      </div>
      {user ? (
        <div>
          <p>{user.email}</p>
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