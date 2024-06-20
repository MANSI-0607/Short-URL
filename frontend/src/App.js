
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/home" element={<Home></Home>} />
      </Routes>
     </Router>
    </div>
   
    
    
  );
}

export default App;
