import "./App.css";
import React from "react";
import Nav from "./Component/Nav/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Tournaments from "./Component/Tournaments/Tournaments";
import Videos from "./Component/Videos/Videos.js";
import Login from "./Component/Login/Login";
import Sign from "./Component/Sign/Sign";
import Forgotpass from "./Component/Forgotpass/Forgotpass";
import Resetpass from "./Component/Resetpass/Resetpass";
import Profile from "./Component/Profile/Profile";
import CreateTournement from "./Component/CreateTournement/CreateTournement";
import Admin from "./Component/Admin/Admin";
import TourProfile from "./Component/TourProfile/TourProfile";
import Admintest from "./Component/Admin/Admintest";
import Manageusers from "./Component/Admin/Manageusers";
import Footer from "./Component/Footer/Footer";
import Error from "./Component/Error/Error";
function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* <Nav />  */}
        <Routes>
          <Route path="/user/sign" element={<Sign />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="tournaments/:id" element={<TourProfile />} />
          <Route path="/Createtournament" element={<CreateTournement />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admintest" element={<Admintest />} />
          <Route path="/user/forgot-password" element={<Forgotpass />} />
          <Route
            path="/user/reset-password/:id/:token"
            element={<Resetpass />}
          />
          <Route path="/user/profile" element={<Profile />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
        {/* <Footer/>  */}
      </div>
    </BrowserRouter>
  );
}
export default App;
