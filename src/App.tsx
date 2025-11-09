import React from "react";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import Quiz from "./components/Quiz";

const App: React.FC = () => {
  return (
    <div className="app">
      <header>
        <h1>Quiz App</h1>
      </header>
      <ErrorBoundary>
        <Quiz />
      </ErrorBoundary>
    </div>
  );
};

export default App;
