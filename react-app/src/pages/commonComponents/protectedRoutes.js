import React, {useEffect} from "react";
import {Outlet} from "react-router";
// import Auth from './Auth';
import {Navigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useLocation} from "react-router-dom";

function ProtectedRoute(props) {
  const location = useLocation();

  const cookieToken = Cookies.get("3DDesigner_userProfile");
  if (cookieToken) {
    let resCookieToken = cookieToken.substring(2, cookieToken.length);
    localStorage.setItem("3D-designerProfile", resCookieToken);
  }
  const isAuthenticated = localStorage.getItem("3D-designerProfile");
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
