import React, { useEffect, useState } from "react";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
} from "firebase/database";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router";

const Home = () => {
  const [task, setTask] = useState("");
  const [taskerror, setTaskerror] = useState("");
  const [tasklist, setTasklist] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [updatemodal, setUpdatemodal] =useState(false)
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
        name: task,
      })
        .then(() => {
          setTask("");
          consolelog("data send successfull");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log(task);
  };
  //read data

  function fetchTodo() {
    const todolistRef = ref(db, "todolist/");
    onValue(todolistRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
        setLoading(false);
      });
      setTasklist(arr);
    });
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleDelete = (id) => {
    remove(ref(db, "todolist/" + id))
      .then(() => {
        alert("Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const handleUpdatemodal =()=>{
  //   setUpdatemodal(true)
  // }
  console.log(tasklist);
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 font-medium text-4xl text-gray-900 dark:text-white"
                >
                  Add your Task
                </label>
                <input
                  onChange={handleTask}
                  type="text"
                  name="name"
                  id="name"
                  value={task}
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
          {loading ? (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <ol className="border border-gray-500 p-2 rounded-2xl mt-2.5 shadow-2xl">
              {tasklist.map((item, i) => (
                <li className="mt-2 text-xl flex">
                  {i + 1}. {item.name}
                  {" "}
                  <RiDeleteBin5Fill
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 ml-5"
                  />
                  <Link to={`/update/${item.id}`}>
                    <CiEdit className="text-2xl ml-2 font-extrabold" />
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
