import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import { Tilt } from "react-tilt";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { isAuthenticated, setisAuthenticated } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredential: true,
        }
      );
      toast.success(data.message);
      setisAuthenticated(true);
    } catch (error) {
      toast.error(" some error");
      console.log(error);
      setisAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

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
      <div>
        <section className="max-h-full max-w-full flex items-center justify-center py-36">
          <h2></h2>
          <Tilt options={defaultOptions}>
            <form
              className="flex flex-col shadow-2xl shadow-orange-300 border-2 border-orange-600 p-8"
              onSubmit={submitHandler}
            >
              <h2 className="text-center font-bold text-4xl p-3 text-orange-600 NewFont">
                Sign Up
              </h2>
              <div className="flex justify-center p-2">
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-transparent border-[1px] w-64 p-2 focus:outline-none border-orange-600"
                />
              </div>
              <div className="flex justify-center p-2">
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border-[1px] w-64 p-2 focus:outline-none border-orange-600"
                />
              </div>
              <div className="flex justify-center p-2">
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="bg-transparent border-[1px] border-orange-600 w-64 p-2 focus:outline-none"
                />
              </div>
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="text-center  bg-orange-600 w-28 p-2 rounded-md text-lg font-bold NewFont hover:bg-black hover:text-orange-600 duration-500"
                >
                  Sign up
                </button>
              </div>
              <h4 className="text-center p-2">Or</h4>
              <div className="flex justify-center">
                <Link
                  to={"/login"}
                  className=" bg-orange-600 w-28 p-2 rounded-md text-lg font-bold NewFont hover:bg-black hover:text-orange-600 duration-500 text-center"
                >
                  Login
                </Link>
              </div>
            </form>
          </Tilt>
        </section>
      </div>
    </>
  );
};

export default Register;
