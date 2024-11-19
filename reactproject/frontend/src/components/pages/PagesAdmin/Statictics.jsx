import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MainLayout from "../../Layouts/MainLayout";
import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

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

  const handleFilterChange = () => {
    let filtered = [...users];

    if (selectedCourse !== "All") {
      filtered = filtered.filter((user) => user.course === selectedCourse);
    }

    if (selectedYear !== "All") {
      filtered = filtered.filter((user) => user.year === selectedYear);
    }

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedCourse, selectedYear]); // Re-run filter when either filter changes

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <MainLayout ActiveTab="Followers">
      <div
        className="container mt-4 rounded p-3 shadow-sm mb-5"
        style={{
          width: "clamp(30rem, 70vw, 75rem)",
          minHeight: "85vh",
          backgroundColor: "#ffff",
        }}
      >
        <Tabs
          defaultActiveKey="Followers"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Followers" title="Registered Users">
            <div
              className="custom-scrollbar overflow-y-scroll"
              style={{ height: "50vh" }}
            >
              {/* Filters */}
              <div className="d-flex justify-content-end mb-3">
                {/* Course Filter */}
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="form-select"
                  style={{ width: "200px", marginRight: "10px" }}
                >
                  <option value="All">All Courses</option>
                  <option value="BS Information Technology">
                    BS Information Technology
                  </option>
                  <option value="BS Industrial Technology">
                    BS Industrial Technology
                  </option>
                  <option value="BS Computer Science">
                    BS Computer Science
                  </option>
                  <option value="BS Computer Engineering">
                    BS Computer Engineering
                  </option>
                </select>

                {/* Sex Filter */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="form-select"
                  style={{ width: "200px" }}
                >
                  <option value="All">Year</option>
                  <option value="1st">1st</option>
                  <option value="2nd">2nd</option>
                  <option value="3rd">3rd</option>
                  <option value="4th">4th</option>
                </select>
              </div>

              {/* Table */}
              <table className="table rounded overflow-hidden">
                <thead>
                  <tr>
                    <th scope="col">Student No.</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Sex</th>
                    <th scope="col">Course</th>
                    <th scope="col">Year</th>
                    <th scope="col">CvSU Email</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(currentUsers) && currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr key={user.userID}>
                        <th scope="row">
                          <p className="m-0 mt-1">{user.studentNumber}</p>
                        </th>
                        <td>
                          <p className="m-0 mt-1">
                            {user.firstName} {user.lastName}
                          </p>
                        </td>
                        <td>
                          <p className="m-0 mt-1">{user.sex}</p>
                        </td>
                        <td>
                          <p className="m-0 mt-1">{user.course}</p>
                        </td>
                        <td>
                          <p className="m-0 mt-1">{user.year}</p>
                        </td>
                        <td>
                          <p className="m-0 mt-1">{user.cvsuEmail}</p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No registered users available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination className="d-flex justify-content-center mt-4">
              <Pagination.Prev
                onClick={handlePrevClick}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={handleNextClick}
                disabled={currentPage === totalPages}
              />
            </Pagination>

            <div className="row mt-2">
              <div className="col-lg-2 d-flex flex-column align-items-start">
                <h5 className="m-0">Total: {filteredUsers.length}</h5>
                <p className="m-0 text-secondary ms-1">
                  Female:{" "}
                  {filteredUsers.filter((user) => user.sex === "Female").length}
                </p>
                <p className="m-0 text-secondary ms-1">
                  Male:{" "}
                  {filteredUsers.filter((user) => user.sex === "Male").length}
                </p>
              </div>
              <div className="col-md d-flex flex-column align-items-start">
                <h5 className="m-0">Courses:</h5>
                <div
                  className="d-flex flex-wrap gap-3 ps-2 text-secondary"
                  style={{ width: "80%" }}
                >
                  <p className="m-0">
                    BS Information Technology:{" "}
                    <b>
                      {
                        filteredUsers.filter(
                          (user) => user.course === "BS Information Technology"
                        ).length
                      }
                    </b>
                  </p>
                  <p className="m-0">
                    BS Industrial Technology:{" "}
                    <b>
                      {
                        filteredUsers.filter(
                          (user) => user.course === "BS Industrial Technology"
                        ).length
                      }
                    </b>
                  </p>
                  <p className="m-0">
                    BS Computer Science:{" "}
                    <b>
                      {
                        filteredUsers.filter(
                          (user) => user.course === "BS Computer Science"
                        ).length
                      }{" "}
                    </b>
                  </p>
                  <p className="m-0">
                    BS Computer Engineering:{" "}
                    <b>
                      {
                        filteredUsers.filter(
                          (user) => user.course === "BS Computer Engineering"
                        ).length
                      }
                    </b>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <button className="primaryButton w-100 py-2 mt-4">
                Download Data
              </button>
            </div>
          </Tab>
          <Tab eventKey="Following" title="Following">
            <div></div>
          </Tab>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Statictics;
