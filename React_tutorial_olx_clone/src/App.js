import React,{useEffect,useContext} from 'react';
import './App.css';
import {AuthContext,FireBaseContext} from './store/Context'
import Post from './store/PostContext'
import Signup from './Pages/Signup'
import Create from './Pages/Create'
import Login from './Pages/Login'
import ViewPost from './Pages/ViewPost'
import {BrowserRouter as Router,Route} from 'react-router-dom'
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const {user,setUser}=useContext(AuthContext)
  const {firebase}=useContext(FireBaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })

  })
  return (
    <div>
<Post>

      <Router>
        <Route exact path='/'>
      <Home />
        </Route>
        <Route  path='/signup'>
      <Signup/>
        </Route>
        <Route  path='/login'>
      <Login/>
        </Route>
        <Route  path='/sell'>
      <Create/>
        </Route>
        <Route  path='/view'>
          <ViewPost/>
        </Route>
      </Router>
</Post>
    </div>
  );
}

export default App;
