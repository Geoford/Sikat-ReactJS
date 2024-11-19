import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MainLayout from "../../Layouts/MainLayout";
import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import FlaggedDiaries from "./FlaggedDiaries";
import RegisteredUser from "./RegisteredUser";
import ReportedUsers from "./ReportedUsers";

const Statictics = () => {
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
        setFilteredUsers(data); // Initialize filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  //   const handleFilterChange = () => {
  //     let filtered = [...users];

  //     if (selectedCourse !== "All") {
  //       filtered = filtered.filter((user) => user.course === selectedCourse);
  //     }

  //     if (selectedYear !== "All") {
  //       filtered = filtered.filter((user) => user.year === selectedYear);
  //     }

  //     setFilteredUsers(filtered);
  //   };

  //   useEffect(() => {
  //     handleFilterChange();
  //   }, [selectedCourse, selectedYear]); // Re-run filter when either filter changes

  //   const indexOfLastUser = currentPage * usersPerPage;
  //   const indexOfFirstUser = indexOfLastUser - usersPerPage;
  //   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  //   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  //   const handlePageChange = (pageNumber) => {
  //     setCurrentPage(pageNumber);
  //   };

  //   const handlePrevClick = () => {
  //     if (currentPage > 1) {
  //       setCurrentPage(currentPage - 1);
  //     }
  //   };

  //   const handleNextClick = () => {
  //     if (currentPage < totalPages) {
  //       setCurrentPage(currentPage + 1);
  //     }
  //   };

  return (
    <MainLayout ActiveTab="Followers">
      <div
        className="container mt-4 rounded p-3 shadow-sm mb-5"
        style={{
          width: "clamp(30rem, 90vw, 90rem)",
          minHeight: "65vh",
          backgroundColor: "#ffff",
        }}
      >
        <Tabs
          defaultActiveKey="RegisteredUser"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="RegisteredUser" title="Registered Users">
            <RegisteredUser users={users} />
          </Tab>
          <Tab eventKey="FlaggedDiaries" title="Flagged Diaries">
            <FlaggedDiaries users={users} />
          </Tab>{" "}
          <Tab eventKey="ReportedUsers" title="Reported Users">
            <ReportedUsers users={users} />
          </Tab>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Statictics;
