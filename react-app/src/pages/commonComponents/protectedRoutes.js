import React, {useEffect} from "react";
import {Outlet} from "react-router";
// import Auth from './Auth';
import {Navigate} from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute(props) {
  const localStorageProfile = localStorage.getItem("3D-designerProfile");

  if (!localStorageProfile) {
    const cookieProfile = Cookies.get("3DDesigner_userProfile");
    if (cookieProfile) {
      let rescookieProfile = cookieProfile.substring(2, cookieProfile.length);
      localStorage.setItem("3D-designerProfile", rescookieProfile);
    }
  }
  const isAuthenticated = localStorage.getItem("3D-designerProfile");
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
