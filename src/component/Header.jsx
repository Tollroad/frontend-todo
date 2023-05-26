import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";

const Header = () => {

  const {isAuthenticated,setisAuthenticated} = useContext(Context);

  return (
    <>
      <div className="bg-black flex">
        <h2 className=" px-6 py-2 text-3xl text-orange-600 font-bold w-full flex text-center justify-start NewFont ">
          ToDo App
        </h2>
        <article >
          <div className=" text-2xl flex p-2 text-orange-600">
            <Link to={"/"} className="px-4 py-0.5 hover:scale-125 duration-500 NewFont"> Home </Link>
            <Link to={"/profile"} className="px-4 py-0.5 hover:scale-125 duration-500 NewFont" > Profile </Link> 
            {
              isAuthenticated ? <Link to={"/login"} className="px-4 py-0.5 hover:scale-125 duration-500 NewFont" > Logout </Link> :  <Link to={"/login"} className="px-4 py-0.5 hover:scale-125 duration-500 NewFont" > Login </Link>
            }
          </div>
        </article>
      </div>
    </>
  );
};

export default Header;
