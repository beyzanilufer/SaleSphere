import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from '../img/logo2.png';
import '../css/Header.css'
import { TiHomeOutline } from "react-icons/ti";



function Header({ setIsLogin }) {
  const navigate = useNavigate();

  const isHome = window.location.pathname.includes("home");

  const handleLogout = () => {

    setIsLogin(true);
    navigate('/login');
  };




  return (
    isHome ?
      <div className="header">

        <div className="flex-row">
          <img className="logo" src={logo} alt="Logo" />
          <p className="logo-header">𝒩𝐼̇𝐿𝒰̈𝐹𝐸𝑅</p>
        </div>
        <Link className="link" to="/about">About</Link>
        <button className="Logout-Button" onClick={handleLogout}>Logout</button>

      </div>
      :
      (
        <div>
          <div className="header">
            <div className="flex-row">
              <Link to="/home">
                <TiHomeOutline className="logo" />
              </Link>

              <p className="logo-header">{sessionStorage.getItem("pageTitle")}</p>
            </div>


            <Link className="link" to="/about">About</Link>
            <button className="Logout-Button" onClick={handleLogout}>Logout</button>
            <p className="logo-header">𝒩𝐼̇𝐿𝒰̈𝐹𝐸𝑅</p>

          </div>


          
        </div>

      )
  )


}
export default Header