import "./App.css";
import Loginpage from "./pages/loginpage.jsx";
import Register from "./pages/register.jsx";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Profilepage from "./pages/myprofile.jsx";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <Router>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Loginpage />} />
          <Route path="/loginpage" element={<Loginpage />} />
          <Route path="/profilepage" element={<Profilepage />} />
        </Routes>
      </UserAuthContextProvider>
    </Router>
  );
}

export default App;
