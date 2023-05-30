import React, { useContext, useEffect } from "react";
import { Context } from "../main";
import Loader from "../component/Loader";
import userIcon from "../../src/assets/man.png";
import { Tilt } from "react-tilt";
import Login from "./Login";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);
  const defaultOptions = {
    reverse: false,
    max: 35,
    perspective: 1000,
    scale: 1.1,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  useEffect(()=>{
    if(user)
    {
      const interval =
      setInterval(() => {
        window.location.reload();
      }, 1000);
      clearInterval(interval);
    }
  },[])

  return loading ? (
    <div className="flex items-center justify-center h-full py-64">
      <Loader />
    </div>
  ) : isAuthenticated ? (
      <div className="">
      <section className="max-h-full max-w-full flex items-center justify-center py-36 ">
      <Tilt options={defaultOptions}>
      <div className="flex flex-col border-2 shadow-2xl shadow-orange-300 border-orange-600 p-8 text-orange-600">
      <p className="font-bold text-5xl text-center pb-4">Profilo</p>
      <div className="flex justify-center items-center">
      <img src={userIcon} alt="man icon" className="w-28 h-28" />
      </div>
      <div className="pt-4 text-center">
      <h1 className="font-bold text-3xl pb-2">{user.name}</h1>
      <p className="font-bold">
      Email : <span>{user.email}</span>
      </p>
      </div>
      </div>
      </Tilt>
      </section>
      </div>
  ):(
    <div>
      <Login/>
    </div>
  )
};

export default Profile;
