import React, { useState, useContext } from "react";
import { FireBaseContext } from "../../store/Context";
import { useHistory,Link } from "react-router-dom";
import Swal from 'sweetalert2'

import Logo from "../../olx-logo.png";
import "./Signup.css";

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = useContext(FireBaseContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((mobile.length)!==10) {
      Swal.fire({  
        icon: 'error',  
        title: 'OOPS!',  
        text: 'Phone number should be 10 digits',  
      });
      return
      
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: username }).then(() => {
          firebase
            .firestore()
            .collection("users")
            .add({
              id: result.user.uid,
              username: username,
              phone: mobile,
            })
            .then(() => {
              Swal.fire({  
                icon: 'success',  
                type: 'success',  
                text: 'You  are Successfully Registered',  
              }); 
              history.push("/login");
            });
        });
      });
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
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
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
