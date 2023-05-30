// import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./component/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";

function App() {

  const {setisAuthenticated,setUser,setloading} = useContext(Context);

  useEffect(() => {
    setloading(true);
    axios.get(`${server}/users/mydetails`,{
      withCredentials:true,
    }).then(res=>{
      setUser(res.data.user);
      setisAuthenticated(true);
      setloading(false)
    }).catch(()=>{
      setUser({});
      setisAuthenticated(false);
      setloading(false);
    })
  },[]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
