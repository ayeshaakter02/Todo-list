import React, { useEffect, useState } from "react";
import { getDatabase, push, ref, set, onValue } from "firebase/database";

const Home = () => {
  const [task, setTask] = useState("");
  const [taskerror, setTaskerror] = useState("");
  const [tasklist, setTasklist ] = useState([])
  const db = getDatabase();

  const handleTask = (e) => {
    setTask(e.target.value);
  };
  //create data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      setTaskerror("task is required");
    } else {
      setTaskerror("");
      console.log(task);
      set(push(ref(db, "todolist/")), {
        task: task,
      })
        .then(() => {
          consolelog("data send successfull");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(task);
  };
  //read data
  useEffect(() => {
    const todolistRef = ref(db, "todolist/");
    onValue(todolistRef, (snapshot) => {
      let arr =[]
      snapshot.forEach((item)=>{
        arr.push(item.val())
      })
      setTasklist(arr)
    });
  },[]);

  console.log(tasklist)
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Add your Task
                </label>
                <input
                  onChange={handleTask}
                  type="text"
                  name="name"
                  id="name"
                  className={`bg-gray-50 border ${
                    taskerror ? "border-red-500" : "border-gray-300"
                  }  text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  placeholder="Type your task"
                  required=""
                />
                {taskerror && <p className="text-red-500">{taskerror}</p>}
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-500 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add product
            </button>
          </form>
          <ul className="border border-gray-500 p-2 rounded-2xl mt-2.5 shadow-2xl">
            {tasklist.map((item)=>{
              return(
                <li className="mt-2 text-xl">1. {item.name}</li>
              )
            })}
            
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
