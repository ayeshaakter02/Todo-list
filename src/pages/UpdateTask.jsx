import { useEffect, useState } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import { getDatabase, ref, onValue, update } from "firebase/database";

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskValue, setTaskValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const db = getDatabase();
    const taskRef = ref(db, `todolist/${id}`);

    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTaskValue(data.name);
      } else {
        setError("Task not found.");
      }
      setLoading(false);
    });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (taskValue.trim() === "") {
      setError("Task cannot be empty.");
      return;
    }

    const db = getDatabase();
    update(ref(db, `todolist/${id}`), {
      name: taskValue,
    })
      .then(() => {
        alert("Task updated successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while updating.");
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-700">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-lg text-red-500">{error}</div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-gradient-to-br from-white to-teal-50 border border-teal-400 rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-teal-700">
        Update Task
      </h2>
      <form onSubmit={handleUpdate}>
        <label className="block mb-5 text-base font-medium text-gray-700">
          Edit your task:
          <input
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            type="text"
            className="mt-3 block w-full p-4 border border-gray-300 rounded-2xl shadow-inner focus:ring-4 focus:ring-teal-400 focus:border-teal-500 transition-all placeholder-gray-400 text-gray-800"
            placeholder="Enter your task..."
          />
        </label>
        {error && (
          <p className="mt-3 text-sm font-semibold text-red-500">{error}</p>
        )}
        <button
          type="submit"
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-400 text-white py-3 rounded-2xl hover:from-green-600 hover:to-green-500 transition-all shadow-lg active:scale-95"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default UpdateTask;
