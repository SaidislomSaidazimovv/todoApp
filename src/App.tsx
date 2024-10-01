import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Todo from "./Todo/Todo";
import TodoDetail from "./TodoDetail/TodoDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/todo/:id" element={<TodoDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
