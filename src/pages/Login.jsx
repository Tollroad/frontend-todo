import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Tilt } from "react-tilt";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setisAuthenticated ,loading,setloading} = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setisAuthenticated(true);
      setloading(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuthenticated(false);
      setloading(false)
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
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
  return (
    <>
      <div className="">
        <section className="max-h-full max-w-full flex items-center justify-center py-36">
          <h2></h2>
          <Tilt option={defaultOptions}>
            <form
              className="flex flex-col border-2 shadow-2xl shadow-orange-300 border-orange-600 p-8"
              onSubmit={submitHandler}
            >
              <h2 className="text-center font-bold text-4xl p-3 text-orange-600 NewFont">
                Login
              </h2>
              <div className="flex justify-center p-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                  className="bg-transparent border-[1px] w-64 p-2 focus:outline-none border-orange-600"
                />
              </div>
              <div className="flex justify-center p-2">
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="Enter your password"
                  className="bg-transparent border-[1px] border-orange-600 w-64 p-2 focus:outline-none"
                />
              </div>
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className=" bg-orange-600 w-28 p-2 rounded-md text-lg font-bold NewFont hover:bg-black hover:text-orange-600 duration-500"
                >
                  Login
                </button>
              </div>
              <h4 className="text-center p-2">Or</h4>
              <div className="flex justify-center">
                <Link
                  to={"/register"}
                  className="text-center  bg-orange-600 w-28 p-2 rounded-md text-lg font-bold NewFont hover:bg-black hover:text-orange-600 duration-500"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Tilt>
        </section>
      </div>
    </>
  );
};

export default Login;
