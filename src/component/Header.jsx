import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import axios from "axios";

const Header = () => {

  const {isAuthenticated,setisAuthenticated,loading,setloading} = useContext(Context);

  const logoutHandler = async (e) => {
    setloading(true);
    try {
      const {data} = await axios.get(`${server}/users/logout`,{
        withCredentials:true,
      });
      toast.success(data.message);
      setisAuthenticated(false);
      setloading(false);
    } catch (error) {
      console.log(error);
      setisAuthenticated(true);
      setloading(false);
    }
  }

  return (
    <>
      <div className="bg-black flex">
        <h2 className=" lg:px-6 lg:py-2 lg:text-3xl text-orange-600 font-bold w-full flex text-center justify-start NewFont text-lg pl-4 py-2 md:text-2xl">
          ToDo App
        </h2>
        <article >
          <div className=" text-2xl flex p-2 text-orange-600">
            <Link to={"/"} className="px-4 py-0.5 hover:scale-125 duration-500 NewFont"> Home </Link>
            <Link to={"/profile"}  className="px-4 py-0.5 hover:scale-125 duration-500 NewFont" > Profile </Link> 
            {
              isAuthenticated ? <button disabled={loading} onClick={logoutHandler} to={"/login"} className="px-4 py-0.5 hover:scale-125 duration-500 NewFont" > Logout </button> :  <Link to={"/login"} className="px-4 py-0.5 hover:scale-125 duration-500 NewFont" > Login </Link>
            }
          </div>
        </article>
      </div>
    </>
  );
};

export default Header;
