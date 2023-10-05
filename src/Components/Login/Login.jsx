import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase__node";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState(null)
  const auth = getAuth(app)
  console.log(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  

  const handleGoogleProvider = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const logInUser = result.user;
        console.log(logInUser);
        setUser(logInUser)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleSingOut = () =>{
    signOut(auth)
    .then(result=>{
      console.log(result);
      setUser(result)
    })
    .catch(error=>{
      console.log(error);
    })
  }

  const handleGitHub=()=>{
    signInWithPopup(auth, githubProvider)
    .then(result=>{
      const loggedIn = result.user
      console.log(loggedIn);
      setUser(loggedIn)
       
    })
    .catch(error=>{
      console.log(error);
    })
  }

  return (
    <div>
      { user ?
        <button onClick={handleSingOut}>Sing-Out</button> :
        <div>
          <button onClick={handleGitHub}>Git-Hub</button>
          <button onClick={handleGoogleProvider}>Login</button>
        </div>
      }
      {user && <div>
        <h2>User: {user.displayName}</h2>
        <h3>Email:{user.email
        }</h3>
        <img src={user.photoURL} alt="" />
      </div>}
    </div>
  );
};

export default Login;