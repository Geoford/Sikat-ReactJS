import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Pagination from "react-bootstrap/Pagination";
import MainLayout from "../../Layouts/MainLayout";
import FlaggedDiaries from "./FlaggedDiaries";
import RegisteredUser from "./RegisteredUser";
import ReportedUsers from "./ReportedUsers";
import DashboardData from "./Dashboard";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 4;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8081/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filtering logic
  useEffect(() => {
    const filtered = users.filter((user) => {
      const courseMatch =
        selectedCourse === "All" || user.course === selectedCourse;
      const yearMatch = selectedYear === "All" || user.year === selectedYear;
      return courseMatch && yearMatch;
    });
    setFilteredUsers(filtered);
  }, [selectedCourse, selectedYear, users]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <MainLayout ActiveTab="Dashboard">
      <div
        className="container mt-4 rounded p-3 px-5 shadow-sm mb-5"
        style={{
          width: "clamp(30rem, 90vw, 90rem)",
          minHeight: "65vh",
          backgroundColor: "#ffff",
        }}
      >
        <h1>Dashboard</h1>
        <div>
          <h5 className="text-start">Today</h5>
          <div className="row">
            <div className="col-md-4 d-flex flex-column gap-2 p-0">
              <div
                className="border rounded shadow-sm overflow-hidden"
                style={{ height: "10rem" }}
              >
                <div
                  className="text-light d-flex justify-content-center align-items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(to right, var(--primary_light), var(--primary))",
                    height: "4rem",
                  }}
                >
                  <i class="bx bx-edit bx-md"></i>
                  <p className="m-0">New Diary Entries</p>
                </div>
                <div
                  className="d-flex align-items-center justify-content-center gap-2"
                  style={{ height: "5rem" }}
                >
                  <h1 className="m-0">00</h1>
                  <div className="d-flex align-items-center text-danger">
                    <h5 className="m-0 mt-2">-69%</h5>
                    <i class="mt-2 bx bx-chevrons-down bx-sm"></i>
                  </div>
                </div>
              </div>
              <div
                className="border rounded shadow-sm overflow-hidden"
                style={{ height: "10rem" }}
              >
                <div
                  className="text-light d-flex justify-content-center align-items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(to right, var(--secondary), var(--secondary_hover))",
                    height: "4rem",
                  }}
                >
                  <i class="bx bx-user-plus bx-md"></i>
                  <p className="m-0">New Users</p>
                </div>
                <div
                  className="d-flex align-items-center justify-content-center gap-2"
                  style={{ height: "5rem" }}
                >
                  <h1 className="m-0">00</h1>
                  <div className="d-flex align-items-center text-success ">
                    <h5 className="m-0 mt-2">+69%</h5>
                    <i class="bx bx-chevrons-up mt-2 bx-sm"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md ">
              <h5>Today's Diary Entries</h5>
              <table className="table rounded overflow-hidden">
                <thead>
                  <tr>
                    <th scope="col">Author</th>
                    <th scope="col">Diary Title</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Engagements</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr key={user.userID}>
                        <th scope="row">Juan Dela Cruz</th>
                        <td>Sample Title</td>
                        <td>Abuse, Awareness,etc</td>
                        <td>0</td>
                        <td>
                          <Link to={`/Profile/${user.userID}`}>
                            <button className="primaryButton">Visit</button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No registered users available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                <Pagination>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
            </div>
          </div>
          <div className="row gap-2">
            <div
              className=" col-md border rounded shadow-sm"
              style={{ height: "10rem" }}
            >
              Flagged Diaries
            </div>
            <div
              className=" col-md border rounded shadow-sm"
              style={{ height: "10rem" }}
            >
              Reported Comments
            </div>{" "}
            <div
              className=" col-md border rounded shadow-sm"
              style={{ height: "10rem" }}
            >
              Reported Users
            </div>
            <div
              className=" col-md border rounded shadow-sm"
              style={{ height: "10rem" }}
            >
              Messages
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
