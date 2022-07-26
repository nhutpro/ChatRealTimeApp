import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Home from "./pages/home/Home";
import { useSelector } from "react-redux";
function App() {
  const isLogin = useSelector((state) => state.user.current);
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        {isLogin && <Route path="/home" element={<Home></Home>}></Route>}
      </Routes>
    </div>
  );
}

export default App;
