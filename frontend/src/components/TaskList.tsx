import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchTasks, addTask, updateTask, deleteTask } from "../api/api";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean; // Add the completed field here
}

const TaskList = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<"add" | "edit">("add");
  const [currentTask, setCurrentTask] = useState<Partial<Task>>({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false); // Track the completed state

  const { data: tasks, refetch } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      refetch();
      closePopup();
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      refetch();
      closePopup();
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => refetch(),
  });

  const openPopup = (type: "add" | "edit", task?: Task) => {
    setPopupType(type);
    if (type === "edit" && task) {
      setCurrentTask(task);
      setTitle(task.title);
      setDescription(task.description);
      setCompleted(task.completed); // Set the completed status when editing
    } else {
      setCurrentTask({});
      setTitle("");
      setDescription("");
      setCompleted(false); // Reset the completed status for new task
    }
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setTitle("");
    setDescription("");
    setCompleted(false); // Reset the completed status when closing the popup
  };

  const handleAddOrUpdate = () => {
    if (popupType === "add") {
      addTaskMutation.mutate({ title, description, completed });
    } else if (popupType === "edit" && currentTask.id) {
      updateTaskMutation.mutate({
        id: currentTask.id,
        title,
        description,
        completed,
      });
    }
  };

  const toggleCompletion = (task: Task) => {
    updateTaskMutation.mutate({
      id: task.id,
      title: task.title,
      description: task.description,
      completed: !task.completed, // Toggle the completed status
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded shadow-lg w-2/3 p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Task List</h2>
        <button
          onClick={() => openPopup("add")}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        >
          Add Task
        </button>
        <table className="table-auto w-full text-center border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Completed</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task) => (
              <tr key={task.id} className="border">
                <td className="px-4 py-2 border">{task.id}</td>
                <td className="px-4 py-2 border">{task.title}</td>
                <td className="px-4 py-2 border">{task.description}</td>
                <td className="px-4 py-2 border">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompletion(task)} // Toggle completion status
                    className="focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => openPopup("edit", task)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteTaskMutation.mutate(task.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded shadow-lg w-1/3 p-6 relative">
            <h2 className="text-xl font-bold mb-4">
              {popupType === "add" ? "Add Task" : "Update Task"}
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={completed}
                onChange={() => setCompleted(!completed)} // Toggle completion status in popup
                className="focus:outline-none"
              />
              <span className="ml-2">Completed</span>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={closePopup}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {popupType === "add" ? "Add" : "Update"}
              </button>
            </div>
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;

