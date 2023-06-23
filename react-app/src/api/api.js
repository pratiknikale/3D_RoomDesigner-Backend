import axios from "axios";
// import { local, live } from "../config/apiUrl";

// const API = axios.create({baseURL: local});
const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("3D-designerProfile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("3D-designerProfile")).token}`;
        // req.headers.role = `Bearer ${JSON.parse(localStorage.getItem("3D-designerProfile")).result.role}`;
    }

    return req;
});


export const signup = async (data, navigate) => {
    try {
        const signUp = await API.post("/userAuth/signup", data);
        localStorage.setItem("3D-designerProfile", JSON.stringify({ ...signUp?.data }));
        alert("signup successfull");
        navigate("/DesignerPage");
        return signUp;
    } catch (error) {
        alert(error.response.data.message);
    }
};

export const login = async (Data, navigate) => {
    try {
        const signIn = await API.post("/userAuth/login", Data);
        localStorage.setItem("3D-designerProfile", JSON.stringify({ ...signIn?.data }));
        alert("login successfull");
        navigate("/DesignerPage");
        return signIn;
    } catch (error) {
        alert(error.response.data.message);
    }
};
