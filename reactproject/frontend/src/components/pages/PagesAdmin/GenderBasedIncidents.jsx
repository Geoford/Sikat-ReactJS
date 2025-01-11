import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import MessageModal from "../../Layouts/DiaryEntry/messageModal";
import MessageAlert from "../../Layouts/DiaryEntry/messageAlert";

export default function GenderBasedIncidents() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "addressed", or "unaddressed"
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of reports per page

  const [modal, setModal] = useState({ show: false, message: "" });
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const closeModal = () => {
    setModal({ show: false, message: "" });
  };
  const closeConfirmModal = () => {
    setConfirmModal({
      show: false,
      message: "",
      onConfirm: () => {},
      onCancel: () => {},
    });
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter, reports]);

  const fetchReports = () => {
    axios
      .get("http://localhost:8081/reports")
      .then((response) => setReports(response.data))
      .catch((err) =>
        setError(err.response?.data?.error || "Failed to fetch reports")
      );
  };

  const applyFilter = () => {
    if (filter === "all") {
      setFilteredReports(reports);
    } else if (filter === "addressed") {
      setFilteredReports(reports.filter((r) => r.isAddress === 1));
    } else if (filter === "unaddressed") {
      setFilteredReports(reports.filter((r) => r.isAddress === 0));
    }
    setCurrentPage(1); // Reset to first page when the filter changes
  };

  const handleAddressed = (reportID) => {
    setConfirmModal({
      show: true,
      message: `Are you sure you want to mark this as addressed?`,
      onConfirm: async () => {
        axios
          .put(`http://localhost:8081/reports/${reportID}`)
          .then(() => {
            closeConfirmModal();
            setModal({
              show: true,
              message: `The case has been addressed.`,
            });
            fetchReports();
          })
          .catch((err) => {
            setError(
              err.response?.data?.error || "Failed to update case report"
            );
          });
      },
      onCancel: () => setConfirmModal({ show: false, message: "" }),
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <MainLayout ActiveTab="Complaints">
      <MessageAlert
        showModal={modal}
        closeModal={closeModal}
        title={"Notice"}
        message={modal.message}
      ></MessageAlert>
      <MessageModal
        showModal={confirmModal}
        closeModal={closeConfirmModal}
        title={"Confirmation"}
        message={confirmModal.message}
        confirm={confirmModal.onConfirm}
        needConfirm={1}
      ></MessageModal>

      <div className="mt-0 mt-lg-2 pt-2 px-2">
        <div
          className="container rounded"
          style={{ backgroundColor: "var(--primary)" }}
        >
          <h4 className="text-light fw-bold m-0 mt-4 mt-lg-0 py-2">
            Gender-Based Incidents Complaints
          </h4>
        </div>

        <div className="container mt-2">
          <div className="row gap-1">
            <div className="col-md-4 d-flex p-0 gap-2">
              <div
                className="w-50 rounded p-3"
                style={{ backgroundColor: "#ffff" }}
              >
                <h5 className="m-0">Awaiting Review</h5>
                <h4 className="m-0 mt-1">
                  {reports.filter((r) => !r.isAddress).length}
                </h4>
              </div>
              <div className="w-50 bg-success rounded text-light p-3">
                <h5 className="m-0">Addressed</h5>
                <h4 className="m-0 mt-1">
                  {reports.filter((r) => r.isAddress).length}
                </h4>
              </div>
            </div>
            <div className="col p-0 d-flex align-items-">
              <FloatingLabel
                className="w-100"
                id="filterDropdown"
                controlId="filterDropdown"
                label="Case Status:"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="unaddressed">Unaddressed Cases</option>
                  <option value="addressed">Addressed Cases</option>
                </Form.Select>
              </FloatingLabel>
            </div>
          </div>
        </div>

        <div className="container mt-2 p-0  rounded overflow-auto">
          {error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <table className="table m-0">
              <thead>
                <tr>
                  <th scope="col" className="text-center align-middle">
                    <h5 className="m-0">Case #</h5>
                  </th>
                  <th scope="col" className="text-center align-middle">
                    <h5 className="m-0">Victim's Name</h5>
                  </th>
                  <th scope="col" className="text-center align-middle">
                    <h5 className="m-0">Sex</h5>
                  </th>
                  <th scope="col" className="text-center align-middle">
                    <h5 className="m-0">Location</h5>
                  </th>
                  <th scope="col" className="text-center align-middle">
                    <h5 className="m-0">Date</h5>
                  </th>
                  <th scope="col" className="text-center align-middle">
                    <h5 className="m-0">Actions</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedReports.map((report) => (
                  <tr className="" key={report.reportID}>
                    <th scope="row" className="text-center align-middle">
                      <p className="m-0 mt-1 d-flex align-items-center justify-content-center gap-1">
                        <div
                          className={`p-0 m-0 d-flex align-items-center justify-content-center ${
                            report.isAddress === 0 ? "bg-danger" : "bg-success"
                          }`}
                          style={{
                            height: ".6rem",
                            width: ".6rem",
                            borderRadius: "50%",
                            color: "#dc143c",
                          }}
                        ></div>
                        <p className="m-0">{report.reportID}</p>
                      </p>
                    </th>
                    <td className="text-center align-middle">
                      <p className="m-0 mt-1">{report.victimName}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="m-0 mt-1">{report.gender}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="m-0 mt-1">{report.location}</p>
                    </td>
                    <td className="text-center align-middle">
                      <p className="m-0 mt-1">
                        {new Date(report.date).toLocaleDateString()}
                      </p>
                    </td>
                    <td
                      className="text-center align-middle"
                      style={{ height: "100%" }}
                    >
                      <div className="d-flex align-items-center justify-content-center gap-1">
                        {!report.isAddress && (
                          <button
                            className="btn btn-success text-light"
                            onClick={() => handleAddressed(report.reportID)}
                          >
                            <p className="m-0">Mark as Addressed</p>
                          </button>
                        )}
                        <Link to={`/Admin/CaseDetails/${report.reportID}`}>
                          <button
                            className="primaryButton rounded text-light py-2"
                            style={{ height: "100" }}
                          >
                            <p className="m-0">View Details</p>
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="container d-flex justify-content-center mt-3">
          <Pagination size="sm">{items}</Pagination>
        </div>
      </div>
    </MainLayout>
  );
}
