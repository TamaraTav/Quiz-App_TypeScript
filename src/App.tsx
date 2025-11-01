import React from "react";
import "./App.css";
import Quiz from "./components/Quiz";

const App: React.FC = () => {
  return (
    <div className="app">
      <header>
        <h1>Quiz App</h1>
      </header>
      <Quiz />
    </div>
  );
};

export default App;
