import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import MainLayout from "../../Layouts/MainLayout";
import axios from "axios";
import DashboardData from "./Dashboard";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [flags, setFlags] = useState([]);
  const [reportedComments, setreportedComments] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const usersPerPage = 4;

  useEffect(() => {
    fetchEntries();
  }, [entries, flags, reportedComments]);

  const fetchEntries = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8081/analytics");
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching diary entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8081/users`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); // Initialize filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await fetch(`http://localhost:8081/flagged`);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setFlags(data);
        setFilteredUsers(data); // Initialize filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchFlags();
  }, []);

  useEffect(() => {
    const fetchReportedComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/getReportedComments`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setreportedComments(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchReportedComments();
  }, []);

  const recentEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.created_at);
    const now = new Date();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    if (now - entryDate <= oneWeek) {
      const formattedDate = entryDate.toLocaleString("en-US", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour12: true,
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      entry.formattedDate = formattedDate;
      return true;
    }
    return false;
  });

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
        <h1 className="border-bottom">Dashboard</h1>
        <div>
          <div class="col-md mb-2">
            <div class="form-floating">
              <select class="form-select" id="floatingSelectGrid">
                <option selected>Day</option>
                <option value="1">Week</option>
                <option value="2">Month</option>
                <option value="3">Year</option>
              </select>
              <label for="floatingSelectGrid">Viewing Data By</label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 d-flex flex-column gap-2">
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
                  <h1 className="m-0">{recentEntries.length}</h1>
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
              <div
                className="overflow-y-scroll custom-scrollbar pe-1 mb-2"
                style={{ height: "18rem" }}
              >
                <table className="table rounded">
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
                    {entries.length > 0 ? (
                      entries.map((entry, index) => (
                        <tr key={`${entry.userID}-${index}`}>
                          <th scope="row">
                            {entry.firstName} {entry.lastName}
                          </th>
                          <td>
                            {entry.title.length > 15
                              ? entry.title.substring(0, 15) + "…"
                              : entry.title}
                          </td>
                          <td>{entry.subjects}</td>
                          <td>0</td>
                          <td>
                            <Link to={`/DiaryEntry/${entry.entryID}`}>
                              <button className="primaryButton">Visit</button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No diary entry available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

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
              className="col-md border rounded shadow-sm overflow-hidden p-0"
              style={{
                height: "7rem",
                background: "linear-gradient(to right, #ff4d4d, #ff3333)",
              }}
            >
              <div
                className="text-light d-flex flex-column justify-content-center align-items-center gap-1"
                style={{
                  height: "100%",
                }}
              >
                <h1 className="m-0">{flags.length}</h1>

                <p className="m-0">Flagged Diaries</p>
              </div>
            </div>
            <div
              className="col-md border rounded shadow-sm overflow-hidden p-0"
              style={{
                height: "7rem",
                background: "linear-gradient(to right, #ff4d4d, #ff3333)",
              }}
            >
              <div
                className="text-light d-flex flex-column justify-content-center align-items-center gap-1"
                style={{
                  height: "100%",
                }}
              >
                <h1 className="m-0">{reportedComments.length}</h1>

                <p className="m-0">Reported Comments</p>
              </div>
            </div>
            <div
              className="col-md border rounded shadow-sm overflow-hidden p-0"
              style={{
                height: "7rem",
                background: "linear-gradient(to right, #ff4d4d, #ff3333)",
              }}
            >
              <div
                className="text-light d-flex flex-column justify-content-center align-items-center gap-1"
                style={{
                  height: "100%",
                }}
              >
                <h1 className="m-0">00</h1>

                <p className="m-0">Reported Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
