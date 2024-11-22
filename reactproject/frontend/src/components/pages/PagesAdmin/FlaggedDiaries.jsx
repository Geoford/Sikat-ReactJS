import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

const FlaggedDiaries = ({ flags }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [alarmingWords, setAlarmingWords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const usersPerPage = 10;

  useEffect(() => {
    const fetchAlarmingWords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/flaggingOptions"
        );
        setAlarmingWords(response.data);
      } catch (error) {
        console.error("Error fetching alarming words:", error);
      }
    };

    fetchAlarmingWords();
  }, []);

  useEffect(() => {
    const applyFilter = () => {
      let filtered = [...flags];

      // Apply subject filter
      if (selectedSubject !== "All") {
        filtered = filtered.filter((flag) =>
          flag.behaviors.toLowerCase().includes(selectedSubject.toLowerCase())
        );
      }

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter((flag) =>
          `${flag.firstName} ${flag.lastName} ${flag.studentNumber} ${flag.behaviors} ${flag.title}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      }

      setFilteredUsers(filtered);
      setCurrentPage(1);
    };

    applyFilter();
  }, [flags, selectedSubject, searchTerm]); // Include searchTerm in dependencies

  // Pagination calculations
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handlers
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevClick = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const downloadData = () => {
    const dataStr = JSON.stringify(filteredUsers, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered_flags.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "70vh" }}
    >
      <div>
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <i className="bx bx-search"></i>
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by name, student number, behaviors, or title"
              aria-label="Search"
              aria-describedby="basic-addon1"
              value={searchTerm} // Bind to state
              onChange={(e) => setSearchTerm(e.target.value)} // Update state on input
            />
          </InputGroup>
        </div>
        {/* Users Table */}
        <div
          className="custom-scrollbar overflow-y-scroll"
          style={{ height: "40vh" }}
        >
          <table className="table rounded overflow-hidden">
            <thead>
              <tr>
                <th scope="col">Student No.</th>
                <th scope="col">Author</th>
                <th scope="col">
                  <select
                    className="form-select border-0 p-0 fw-bold text-center"
                    style={{
                      maxWidth: "250px",
                    }}
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="All">Subject/Alarming Word</option>
                    {alarmingWords.map((word, index) => (
                      <option
                        key={index}
                        className="text-break"
                        value={word.reason || word.title}
                      >
                        {word.reason || word.title}
                      </option>
                    ))}
                  </select>
                </th>
                <th scope="col">Flag Count</th>
                <th scope="col">Diary Title</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((flag) => (
                  <tr key={flag.userID}>
                    <th scope="row">{flag.studentNumber}</th>
                    <td>{`${flag.firstName} ${flag.lastName}`}</td>
                    <td>{flag.behaviors}</td>
                    <td>0</td>
                    <td>{flag.title}</td>
                    <td className="text-success">Pending</td>
                    <td>
                      <button className="secondaryButton">
                        Mark as Reviewed
                      </button>
                      <button className="primaryButton">Check</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No flagged diary available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between">
          {/* Statistics */}
          <div className="row mt-2 w-50">
            <div className="col-lg-2 d-flex flex-column align-items-start">
              <h5 className="m-0">Total: {filteredUsers.length}</h5>
              <p className="m-0 text-secondary">
                Female:{" "}
                {filteredUsers.filter((user) => user.sex === "Female").length}
              </p>
              <p className="m-0 text-secondary">
                Male:{" "}
                {filteredUsers.filter((user) => user.sex === "Male").length}
              </p>
            </div>
          </div>
          {/* Pagination */}
          <Pagination className="d-flex justify-content-center mt-4">
            <Pagination.First onClick={() => handlePageChange(1)} />
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
            <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </Pagination>
        </div>
      </div>

      {/* Download Button */}
      <button className="primaryButton w-100 py-2 mt-4" onClick={downloadData}>
        Download Data
      </button>
    </div>
  );
};

export default FlaggedDiaries;
