import React, { useState,useContext } from 'react';
import {FireBaseContext} from '../../store/Context'
import {useHistory,Link} from 'react-router-dom'
import Swal from 'sweetalert2'

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {firebase}=useContext(FireBaseContext)
  const history=useHistory()
  const handleSubmit=(e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      Swal.fire({  
        icon: 'success',  
        type: 'success',  
        text: 'You  are Successfully Logged in',  
      }); 
    
    history.push('/')
    }).catch((error)=>{
      Swal.fire({  
        icon: 'error',  
        title: 'OOPS!',  
        text: 'Invalid credentials',  
      });
    })

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup">SignUp</Link>
      </div>
    </div>
  );
}

export default Login;
