import {signup, login} from "../../api/api";

const signinFieldHandler = (e, signupData, setSignupData) => {
  e.preventDefault();
  setSignupData({...signupData, [e.target.name]: e.target.value});
};
const loginFieldHandler = (e, loginData, setLoginData) => {
  e.preventDefault();
  setLoginData({...loginData, [e.target.name]: e.target.value});
};

const submitSignup = async (e, signupData, messageOpen, setMessageOpen, navigate) => {
  e.preventDefault();
  await signup(signupData, navigate).then((result) => {
    if (result.error) {
      setMessageOpen({show: true, status: "failed", message: result.message});
      setTimeout(() => {
        setMessageOpen({...messageOpen, status: "failed", show: false});
      }, 4000);
    } else {
      // dispatch(setLoggedUser(result.data));
      setMessageOpen({show: true, status: "success", message: "Successfully created new account and loggedIn"});
      setTimeout(() => {
        setMessageOpen({...messageOpen, status: "success", show: false});
      }, 4000);
    }
  });
};
const loginSubmit = async (e, loginData, messageOpen, setMessageOpen, navigate) => {
  e.preventDefault();
  await login(loginData, navigate).then((result) => {
    if (result.error) {
      setMessageOpen({show: true, status: "failed", message: result.message});
      setTimeout(() => {
        setMessageOpen({...messageOpen, status: "failed", show: false});
      }, 4000);
    } else {
      // dispatch(setLoggedUser(result.data));
      setMessageOpen({show: true, status: "success", message: "Successfully LoggedIn"});
      setTimeout(() => {
        setMessageOpen({...messageOpen, status: "success", show: false});
      }, 4000);
    }
  });
};

export {signinFieldHandler, loginFieldHandler, submitSignup, loginSubmit};
