import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";
import UserTable from "./components/UserTable";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route></Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/UserTable" element={<UserTable />} />
          <Route path="/AddStudent" element={<AddStudent />} />
          <Route path="/Update/:ID" element={<UpdateStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
