import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";

export default function GenderBasedIncidents() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "addressed", or "unaddressed"
  const [error, setError] = useState(null);

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
  };

  const handleAddressed = (reportID) => {
    axios
      .put(`http://localhost:8081/reports/${reportID}`)
      .then(() => {
        alert("The case has been addressed!");
        fetchReports();
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Failed to update report");
      });
  };

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <MainLayout ActiveTab="Complaints">
      <div className="mt-3 pt-0 pt-lg-2 px-2" style={{}}>
        <div
          className="container rounded "
          style={{ backgroundColor: "var(--primary)" }}
        >
          <h4 className="text-light fw-bold m-0 mt-4 mt-lg-0 py-2">
            Gender-Based Incidents Complaints
          </h4>
        </div>

        <div className="container mt-2">
          <div className="row gap-2 gy-2">
            {/* <h3 className="text-start">Case Status</h3> */}
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
                label="Filter Cases:"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <Form.Select aria-label="Floating label select example">
                  <option value="all">All Cases</option>
                  <option value="unaddressed">Unaddressed Cases</option>
                  <option value="addressed">Addressed Cases</option>
                </Form.Select>
              </FloatingLabel>
            </div>
          </div>
        </div>

        <div className="container mt-3 p-0  rounded  overflow-auto">
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
                {filteredReports.map((report) => (
                  <tr
                    className={report.isAddress === 0 ? "table-danger" : ""}
                    key={report.reportID}
                  >
                    <th scope="row" className="text-center align-middle">
                      <p className="m-0 mt-1 d-flex align-items-center justify-content-center">
                        {report.isAddress === 0 ? (
                          <div
                            className="p-0 m-0 d-flex align-items-center justify-content-center"
                            style={{
                              backgroundColor: "#b22222",
                              height: "15px",
                              width: "15px",
                              borderRadius: "50%",
                              color: "#dc143c",
                            }}
                          ></div>
                        ) : (
                          <div
                            className="p-0 m-0 d-flex align-items-center justify-content-center"
                            style={{
                              backgroundColor: "#228b22",
                              height: "15px",
                              width: "15px",
                              borderRadius: "50%",
                              color: "#7fff00",
                            }}
                          ></div>
                        )}
                        {report.reportID}
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
                          <button className="primaryButton rounded text-light py-2">
                            <p className="m-0">View</p>
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
