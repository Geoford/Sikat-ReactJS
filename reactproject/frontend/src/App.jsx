import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./components/pages/IndexPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
// USER
import Home from "./components/pages/PagesUser/Home";
import UserProfile from "./components/pages/PagesUser/UserProfile";
import DiaryEntries from "./components/pages/PagesUser/DiaryEntries";
import DiaryEntry from "./components/pages/PagesUser/DiaryEntry";
import Profile from "./components/pages/PagesUser/OtherUserProfile";
// import UpdateUser from "./components/pages/PagesUser/UpdateUser";

// ADMIN
import AdminHome from "./components/pages/PagesAdmin/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route
            path="/Login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Register"
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          {/* USER ROUTES */}
          <Route path="/Home" element={<Home />} />
          <Route path="/UserProfile/:userID" element={<UserProfile />} />
          <Route path="/Profile/" element={<Profile />} />
          <Route path="/DiaryEntries/" element={<DiaryEntries />} />
          <Route path="/DiaryEntry/" element={<DiaryEntry />} />

          {/* ADMIN ROUTES */}
          <Route path="/Admin/Home" element={<AdminHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
