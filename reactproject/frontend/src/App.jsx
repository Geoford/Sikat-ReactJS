import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./components/pages/IndexPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Landing from "./components/pages/Landing";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route></Route>
          <Route path="/" element={<IndexPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Landing" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
