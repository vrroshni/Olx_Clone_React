import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext, FireBaseContext } from "../../store/Context";
import Swal from 'sweetalert2'


import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
function Header() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FireBaseContext);
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user ? (
            <span>{`Welcome ${user.displayName}`}</span>
          ) : (
            <span
              onClick={() => {
                history.push("/login");
              }}
            >
              LogIn
            </span>
          )}
          <hr />
        </div>
        {user && (
          <span
            onClick={() => {
              Swal.fire({
                title: 'Are you Sure?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "OK",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: "Cancel",
                icon: 'warning'
            }
            ).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
      
                    Swal.fire('You are logged out', '', 'success');
                    firebase.auth().signOut();
                    history.push("/");
      
                } 
      
            })
              
            }}
          >
            Logout
          </span>
        )}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent" >
            <SellButtonPlus></SellButtonPlus>
            {user ? (
              <span
                onClick={() => {
                  history.push("/sell");
                }}
              >
                SELL
              </span>
            ) : (
              <span
                onClick={() => {
                  history.push("/login");
                }}
              >
                SELL
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
