import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../component/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setloading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const {isAuthenticated} = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const { data } = await axios.post(
        `${server}/tasks/new`,
        { title, description },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setloading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setloading(false);
    }
  };

  const updateHandler = async (id) => {
    try {
      const {data} = await axios.put(`${server}/tasks/${id}`,{},{withCredentials:true,})
      toast.success(data.message,{id:5});
      console.log("aara")
      } catch (error) {
        console.log("nhi aara")
        toast.error(error.response.data.message)
      }
  };

  const deletehandler = async (id) => {
    try {
    const {data} = await axios.delete(`${server}/tasks/${id}`,{withCredentials:true,})
    toast.success(data.message,{id:2});
    } catch (error) {
      toast.error(error.response.data.message)
    }
    
  };

  useEffect(() => {
    axios
      .get(`${server}/tasks/allTasks`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.allTasks);
      })
      .catch((e) => {
        toast.error("Login to view all tasks", {
          id: 7,
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#FF6600",
            color: "#000000",
          },
        });
      });
  }, [tasks]);

  if(!isAuthenticated) return <Navigate to={"/login"} />

  return (
    <>
      <div className="">
        <div className=" max-h-full max-w-full flex items-center justify-center pt-36 pb-10">
          <form
            className=" border-[1px] border-orange-600 p-4 flex flex-col"
            onSubmit={submitHandler}
          >
            <h2 className="text-center font-bold text-4xl p-3 text-orange-600 NewFont">
              New Task
            </h2>
            <input
              className="bg-transparent border-[1px] w-96 p-2 focus:outline-none border-orange-600 my-3"
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="bg-transparent border-[1px] w-96 p-2 focus:outline-none border-orange-600"
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                disabled={loading}
                className="mt-3 bg-orange-600 w-28 p-2 rounded-md text-lg font-bold NewFont hover:bg-black hover:text-orange-600 duration-500 "
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
        {tasks != "" && (
          <section>
            <h2 className="text-center font-bold text-4xl p-3 text-orange-600 NewFont">
              All Tasks
            </h2>
            {tasks.map((data, index) => (
              <div>
                <TodoItem
                  title={data.title}
                  description={data.description}
                  index={index + 1}
                  isCompleted={data.isCompleted}
                  updateHandler={updateHandler}
                  deletehandler={deletehandler}
                  id={data._id}
                />
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  );
};

export default Home;
