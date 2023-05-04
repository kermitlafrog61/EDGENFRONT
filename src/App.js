import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; import QuizList from './components/QuizList';
import Quiz from './components/Quiz';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/subject/:id" element={<QuizList />} />
        <Route exact path="/quiz/:id" element={<Quiz />} />
      </Routes>
    </Router>
  );
}


export default App;
