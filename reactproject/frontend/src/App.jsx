import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./components/pages/IndexPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

// USER
import Home from "./components/pages/PagesUser/Home";
// import UserProfile from "./components/pages/PagesUser/UserProfile";
import DiaryEntries from "./components/pages/DiaryEntries";
import DiaryEntry from "./components/pages/DiaryEntry";
import Profile from "./components/pages/Profile";
import GetHelp from "./components/pages/PagesUser/GetHelp";
import Settings from "./components/pages/Settings";
import Followers from "./components/pages/Followers";

import LoginRegister from "./components/pages/LoginRegister";

// ADMIN
import AdminHome from "./components/pages/PagesAdmin/AdminHome";
import GenderBasedIncidents from "./components/pages/PagesAdmin/GenderBasedIncidents";
import GenerateReport from "./components/pages/PagesAdmin/Statictics";
import CaseDetails from "./components/pages/PagesAdmin/CaseDetails";
// import AdminProfile from "./components/pages/PagesAdmin/AdminProfile";
import AdminDiaryEntry from "./components/pages/PagesAdmin/DiaryEntry";

import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <IndexPage />
              </ProtectedRoute>
            }
          />
          <Route path="/Login" element={<LoginRegister />} />
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
          {/* <Route path="/Profile/:userID" element={<UserProfile />} /> */}
          <Route path="/Profile/:userID" element={<Profile />} />
          <Route path="/DiaryEntries/" element={<DiaryEntries />} />
          <Route path="/DiaryEntry/:entryID" element={<DiaryEntry />} />
          <Route path="/GetHelp" element={<GetHelp />} />
          <Route path="/Settings/:userID" element={<Settings />} />
          <Route path="/Followers" element={<Followers />} />

          {/* ADMIN ROUTES */}
          <Route path="/Admin/Home" element={<AdminHome />} />
          <Route
            path="/Admin/GenderBasedIncidents"
            element={<GenderBasedIncidents />}
          />
          <Route path="/Admin/Statistics" element={<GenerateReport />} />
          <Route path="/Admin/CaseDetails" element={<CaseDetails />} />
          {/* <Route path="/Admin/Profile/:userID" element={<AdminProfile />} /> */}
          <Route
            path="/Admin/DiaryEntry/:entryID"
            element={<AdminDiaryEntry />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
