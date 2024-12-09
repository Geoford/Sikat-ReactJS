import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

const FlaggedDiaries = ({ flags }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [alarmingWords, setAlarmingWords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
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
          flag.reasons.toLowerCase().includes(selectedSubject.toLowerCase())
        );
      }

      if (searchTerm) {
        filtered = filtered.filter((flag) => {
          const isAddressed = flag.isAddress === 1 ? "Addressed" : "Pending";
          return `${flag.firstName} ${flag.lastName} ${flag.studentNumber} ${flag.reasons} ${flag.title} ${isAddressed}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        });
      }

      setFilteredUsers(filtered);
      setCurrentPage(1);
    };

    applyFilter();
  }, [flags, selectedSubject, searchTerm]);

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

  const handleAddressed = (report_id) => {
    const confirmed = window.confirm("Want to address this flagged?");
    if (confirmed) {
      axios
        .put(`http://localhost:8081/flaggedAddress/${report_id}`)
        .then(() => {
          alert("The flagged has been addressed!");
        })
        .catch((err) => {
          setError(err.response?.data?.error || "Failed to update flagged");
        });
    }
  };

  const downloadData = (format) => {
    if (format === "html") {
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Flagged Diaries</title>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
            }
            th {
              background-color: #f4f4f4;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h1>Flagged Diaries</h1>
          <table>
            <thead>
              <tr>
                <th>Student No.</th>
                <th>Full Name</th>
                <th>Behavior</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              ${currentUsers
                .map(
                  (flag) => `
                <tr>
                  <td>${flag.studentNumber}</td>
                  <td>${flag.firstName} ${flag.lastName}</td>
                  <td>${flag.reasons}</td>
                  <td>${flag.title}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "flagged_diaries.html";
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === "excel") {
      const header = ["Student No.", "Author", "Behavior", "Title"];
      const rows = currentUsers.map((flag) => [
        flag.studentNumber,
        `${flag.firstName} ${flag.lastName}`,
        flag.reasons,
        flag.title,
      ]);

      const csvContent = [header, ...rows]
        .map((row) => row.join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "flagged_diaries.csv";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="d-flex flex-column">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
        {/* Users Table */}
        <div
          className="custom-scrollbar"
          style={{
            height: "40vh",
            overflowY: "auto",
          }}
        >
          <table className="table rounded">
            <thead
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#f8f9fa",
                zIndex: 2,
              }}
            >
              <tr>
                <th scope="col" className="text-center align-middle">
                  <h5 className="m-0">Student No.</h5>
                </th>
                <th scope="col" className="text-center align-middle">
                  <h5 className="m-0">Author</h5>
                </th>
                <th
                  scope="col"
                  className="text-center align-middle"
                  style={{ minWidth: "clamp(11rem, 50dvw, 15dvw)" }}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <select
                      className="form-select border-0 fw-bold text-center"
                      style={{
                        maxWidth: "max-content",
                      }}
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                    >
                      <option value="All">Reason(All)</option>
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
                  </div>
                </th>
                <th scope="col" className="text-center align-middle">
                  <h5 className="m-0">Diary Title</h5>
                </th>
                <th scope="col" className="text-center align-middle">
                  <h5 className="m-0">Status</h5>
                </th>
                <th scope="col" className="text-center align-middle" style={{}}>
                  <h5 className="m-0">Action</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((flag) => (
                  <tr key={flag.userID}>
                    <th scope="row" className="text-center align-middle">
                      <p className="m-0">{flag.studentNumber}</p>
                    </th>
                    <td className="text-center align-middle">
                      <p className="m-0">{`${flag.firstName} ${flag.lastName}`}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="m-0">{flag.reasons}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="m-0">{flag.title}</p>
                    </td>
                    <td className=" text-center align-middle">
                      {flag.isAddress === 1 ? (
                        <p className="text-success m-0">Addressed</p>
                      ) : (
                        <p className="text-danger m-0">Pending</p>
                      )}
                    </td>
                    <td className="text-center align-middle">
                      {!flag.isAddress && (
                        <button
                          className="secondaryButton"
                          onClick={() => handleAddressed(flag.report_id)}
                        >
                          <p className="m-0">Mark as Reviewed</p>
                        </button>
                      )}
                      <Link to={`/DiaryEntry/${flag.entryID}`}>
                        <button className="primaryButton">
                          <p className="m-0">Check</p>
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No flagged diaries available.
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
          <Pagination className="d-flex justify-content-center align-items-center mt-4">
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
                <p className="m-0">{index + 1}</p>
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
      <div className="row d-flex gap-1 mt-2 px-3">
        <div className="col p-0">
          <button
            className="w-100 primaryButton py-1 py-md-2"
            onClick={() => downloadData("html")}
          >
            <p className="m-0">Download as HTML</p>
          </button>
        </div>
        <div className="col p-0">
          <button
            className="w-100 primaryButton py-1 py-md-2"
            onClick={() => downloadData("excel")}
          >
            <p className="m-0">Download as Excel</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlaggedDiaries;
