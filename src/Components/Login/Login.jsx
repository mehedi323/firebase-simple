import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase__node";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState(null)
  const auth = getAuth(app)
  console.log(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleProvider = () => {
    signInWithPopup(auth, provider)
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

  return (
    <div>
      { user ?
        <button onClick={handleSingOut}>Sing-Out</button> :
      <button onClick={handleGoogleProvider}>Login</button>}
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