import './App.css';
import Auth from "./pages/Auth";
import DesignerPage from './pages/DesignerPage';
import ProtectedRoute from "./pages/components/protectedRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// color comb
// 1. #659DBD
// 2. #8D8741
// 3. #DAAD86
// 4. #BC986A
// 5. #FBEEC1
// background: rgb(21, 80, 113);
// background: linear - gradient(155deg, rgba(21, 80, 113, 1) 0 %, rgba(101, 157, 189, 1) 59 %, rgba(101, 157, 189, 1) 100 %);


function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      {/* <SocketContext.Provider value={socket}>
        {user.result && socket && <Sidebar />} */}
      {/* <div className={user.result ? "mainContainer" : "notLoggedMainContainer"}> */}
      <div style={{ height: "100%", background: "linear-gradient(155deg, rgba(21, 80, 113, 1)0%, rgba(101, 157, 189, 1)59%, rgba(101, 157, 189, 1)100%)" }}>
        <Routes>
          <Route exact path="/" element={<Auth />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path="/DesignerPage" element={<DesignerPage />} />
            {/* <Route element={<ProtectedManagerRoute />}>
                <Route exact path="/ManageEmployee" element={<ManageEmployee />} />
                <Route exact path="/ManageManager" element={<ManageManager />} />
                <Route exact path="/Assigned" element={<Assigned />} />
              </Route>
              <Route exact path="/Chats" element={<Chats />} />
              <Route exact path="/Settings" element={<Settings />} /> */}
          </Route>
        </Routes>
        {/* <Footer /> */}
      </div>
      {/* </SocketContext.Provider> */}
    </BrowserRouter>
  );
}

export default App;
