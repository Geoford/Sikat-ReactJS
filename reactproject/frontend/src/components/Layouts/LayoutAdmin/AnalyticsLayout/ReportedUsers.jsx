import React, { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { Link } from "react-router-dom";

const ReportedUsers = ({ reportedComments }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [option, setOption] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchReportComments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/reportComments"
        );
        setOption(response.data);
      } catch (error) {
        console.error("Error fetching alarming words:", error);
      }
    };

    fetchReportComments();
  }, []);

  useEffect(() => {
    const applyFilter = () => {
      let filtered = reportedComments;

      if (selectedSubject !== "All") {
        filtered = filtered.filter((reportedComment) =>
          reportedComment.reason
            .toLowerCase()
            .includes(selectedSubject.toLowerCase())
        );
      }

      if (searchQuery.trim() !== "") {
        filtered = filtered.filter(
          (reportedComment) =>
            reportedComment.firstName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            reportedComment.lastName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            reportedComment.text
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            reportedComment.reason
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      setFilteredUsers(filtered);
      setCurrentPage(1);
    };

    applyFilter();
  }, [reportedComments, selectedSubject, searchQuery]);

  // Calculate pagination
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

  const downloadData = (format) => {
    if (format === "html") {
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title> Reported User </title>
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
          <h1>Reported User</h1>
          <table>
            <thead>
              <tr>
                <th>Student No.</th>
                <th>Full Name</th>
                <th>Reason</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              ${currentUsers
                .map(
                  (reportedComment) => `
                <tr>
                  <td>${reportedComment.studentNumber}</td>
                  <td>${reportedComment.firstName} ${reportedComment.lastName}</td>
                  <td>${reportedComment.reason}</td>
                  <td>${reportedComment.text}</td>
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
      link.download = "reported_users.html";
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === "excel") {
      const header = ["Student No.", "Full Name", "Reason", "Comment"];
      const rows = currentUsers.map((reportedComment) => [
        reportedComment.studentNumber,
        `${reportedComment.firstName} ${reportedComment.lastName}`,
        reportedComment.reason,
        reportedComment.text,
      ]);

      const csvContent = [header, ...rows]
        .map((row) => row.join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "reported_user.csv";
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
              placeholder="Search name, student number"
              aria-label="Search"
              aria-describedby="basic-addon1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  <h5 className="m-0">Name</h5>
                </th>
                <th scope="col" className="text-center align-middle">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="form-select border-0 p-0 fw-bold text-center"
                    style={{
                      maxWidth: "250px",
                    }}
                  >
                    <option value="All">Violation</option>
                    {option.map((word, index) => (
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
                <th scope="col" className="text-center align-middle">
                  <h5 className="m-0">Reported Comment</h5>
                </th>
                <th scope="col" className="text-center align-middle">
                  <h5 className="m-0">Status</h5>
                </th>
                <th scope="col" className="text-center align-middle">
                  <h5 className="m-0">Action</h5>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((reportedComment) => (
                  <tr key={reportedComment.userID}>
                    <th scope="row" className="text-center align-middle">
                      <p className="m-0">{reportedComment.studentNumber}</p>
                    </th>
                    <td className="text-center align-middle">
                      <p className="m-0">{`${reportedComment.firstName} ${reportedComment.lastName}`}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="m-0">{reportedComment.reason}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="m-0">{reportedComment.text}</p>
                    </td>
                    <td className="text-success text-center align-middle">
                      <p className="m-0">Pending</p>
                    </td>
                    <td className="text-center align-middle">
                      <button className="secondaryButton">
                        <p className="m-0">Mark as Reviewed</p>
                      </button>
                      <Link to={`/DiaryEntry/${reportedComment.entryID}`}>
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
                    No reported comments available.
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
      <div className="d-flex gap-1 mt-2">
        <button
          className="primaryButton py-1 py-md-2 px-3 "
          onClick={() => downloadData("html")}
        >
          <p className="m-0">Download as HTML</p>
        </button>
        <button
          className="primaryButton py-1 py-md-2 px-3 "
          onClick={() => downloadData("excel")}
        >
          <p className="m-0">Download as Excel</p>
        </button>
      </div>
    </div>
  );
};

export default ReportedUsers;
