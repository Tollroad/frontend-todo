import React from "react";

const TodoItem = ({
  title,
  description,
  index,
  isCompleted,
  updateHandler,
  deletehandler,
  id,
}) => {
  return (
    <>
      <div className="max-h-full max-w-full flex flex-col items-center justify-center">
        <div className="p-4 w-96 ">
          <div className="flex">
            <div className="flex items-center pr-3 text-black font-bold">
              {index}.
            </div>
            <div className="flex justify-between w-96">
              <div className="bg-white flex flex-col text-orange-600">
                <h2 className="font-bold ">
                  <span className="text-black">Label :</span> {title}
                </h2>
                <p className="font-bold">
                  <span className="text-black">Description : </span>
                  {description}
                </p>
              </div>
              <div className="flex">
                <input
                  type="checkbox"
                  className="m-2"
                  checked={isCompleted}
                  onChange={()=>{updateHandler(id)}}
                />
                <button
                  onClick={() => {
                    deletehandler(id);
                  }}
                  className="mt-3 bg-orange-600 w-fit h-8 items-center justify-center flex p-3 rounded-md text-lg font-bold NewFont hover:bg-black hover:text-orange-600 duration-500 "
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default TodoItem;
