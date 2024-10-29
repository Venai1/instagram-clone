import React, { useState, useEffect } from 'react';
import Post from './Post';
import './App.css';
import { db , auth } from './firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import BasicModal from './model';

function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // user logged in
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // dont update username
        } else {
          // if we just created someone
          await updateProfile(authUser, {
            displayName: username,
          });
        }

      }
      else {
        // user logged out
        setUser(null);
      }
    })

    return () => {
      // perform cleanup 
      unsubscribe();
    }
  }, [user, username]);


  useEffect(() => {
    // Create a reference to the 'posts' collection
    const postsCollectionRef = collection(db, 'posts');

    // Set up a real-time listener to the 'posts' collection
    const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({
        id: doc.id, 
        post: doc.data()
        })
      ));
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);


  const signUp = async (event) => {
      event.preventDefault(); 
      await createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => alert(error.message));
  };

  return (
    <div className="app">
      
      {/* Header */}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

      <BasicModal 
        username={username}
        email={email}
        password={password}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        signUp={signUp}
        auth = {auth}
        user = {user}
      />

      {/* Render posts */}
      { 
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageURL={post.imageURL} />
        ))
      }
    </div>
  );
}

export default App;
