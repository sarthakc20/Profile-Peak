import React, { createContext, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Contact from "./component/Contact";
import Errorpage from "./component/Errorpage";
import Logout from "./component/Logout";




import { initialState, reducer } from "./reducer/useReducer";

 // 1: context API
 export const UserContext = createContext();

const App = () => {

 const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signout" element={<Logout />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
