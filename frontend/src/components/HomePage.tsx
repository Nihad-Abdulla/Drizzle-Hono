import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Task and Tag Management System
      </h1>
      <nav>
        <ul className="space-y-8">
          <li>
            <Link
              to="/tasks"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
            >
              Go to Task List
            </Link>
          </li>
          <li>
            <Link
              to="/tags"
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              Go to Tag List
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
