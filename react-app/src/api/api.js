import axios from "axios";
// require('dotenv').config()

const API = axios.create({ baseURL: `http://${process.env.REACT_APP_BACKEND_BASE_URL}:${process.env.REACT_APP_BACKEND_BASE_PORT}` });

export const signup = async (data, navigate) => {
  try {
    const signUp = await API.post("/userAuth/signup", data, { withCredentials: true });
    localStorage.setItem("3D-designerProfile", JSON.stringify({ ...signUp?.data }));
    navigate("/DashboardPage");
    return signUp;
  } catch (error) {
    return { error: true, message: error?.response?.data?.message };
  }
};

export const login = async (Data, navigate) => {
  try {
    const signIn = await API.post("/userAuth/login", Data, { withCredentials: true });
    localStorage.setItem("3D-designerProfile", JSON.stringify({ ...signIn?.data }));
    navigate("/DashboardPage");
    return signIn;
  } catch (error) {
    return { error: true, message: error?.response?.data?.message };
  }
};

export const logOut = async (navigate) => {
  try {
    const logOut = await API.get("/userAuth/logOut", { withCredentials: true });
    return logOut;
  } catch (error) {
    return { error: true, message: error?.response?.data?.message };
  }
};

// protected test api
export const protectedRouteTest = async () => {
  const result = await API.get("/userAuth/protectedCheckJWT", { withCredentials: true });
  return result;
};
