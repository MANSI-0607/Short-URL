
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Option from './components/Option';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebCrawl from './components/WebCrawl';
import Report from './components/Report';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/short-id" element={<Home></Home>} />
      <Route path="/web-crawler" element={<WebCrawl></WebCrawl>} />
      <Route path="/option" element={<Option></Option>} />
      <Route path="/report/:id" element={<Report></Report>} />
      </Routes>
     </Router>
    </div>
   
    
    
  );
}

export default App;
