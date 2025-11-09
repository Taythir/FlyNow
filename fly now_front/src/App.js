import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login"
import Signup from "./pages/login/signup"
import MainPage from "./pages/Main/main.jsx"
import FlightPage from "./pages/flight/FlightPage";
import SearchFlightPage from "./pages/flight/SearchFlightPage";
import BookFlightPage from "./pages/flight/BookFlightPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main"  element={<MainPage/>} />
          <Route path="/flight" element={<FlightPage />} />
          <Route path="/search-flight" element={<SearchFlightPage />} />
          <Route path="/book-flight" element={<BookFlightPage />} />
          {/*<Route path="/search" element={<SearchResults />} />*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
