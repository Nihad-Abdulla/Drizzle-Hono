import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import TaskList from "./components/TaskList";
import TagList from "./components/TagList";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}> {/* Wrap the Router with QueryClientProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tags" element={<TagList />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;


