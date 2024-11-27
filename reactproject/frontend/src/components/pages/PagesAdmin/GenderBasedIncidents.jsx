import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout";
import axios from "axios";

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

  return (
    <MainLayout ActiveTab="Complaints">
      <div className="mt-4">
        <h2 className="fw-bold m-0">Gender-Based Incidents Complaints</h2>
        <div className="container-fluid container-lg mb-2">
          <h3 className="text-start">Case Status</h3>
          <div className="d-flex gap-2">
            <div className="rounded p-3" style={{ backgroundColor: "#ffff" }}>
              <h5 className="m-0">
                Awaiting Review {reports.filter((r) => !r.isAddress).length}
              </h5>
            </div>
            <div className="bg-success rounded text-light p-3">
              <h5 className="m-0">
                Addressed {reports.filter((r) => r.isAddress).length}
              </h5>
            </div>
          </div>
        </div>
        <div className="container-fluid container-lg mb-3">
          <div className="d-flex align-items-center">
            <label htmlFor="filterDropdown" className="me-3">
              Filter Cases:
            </label>
            <select
              id="filterDropdown"
              className="form-select w-auto"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Cases</option>
              <option value="unaddressed">Unaddressed Cases</option>
              <option value="addressed">Addressed Cases</option>
            </select>
          </div>
        </div>
        <div className="container-fluid container-lg">
          {error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <table className="table rounded overflow-hidden">
              <thead>
                <tr>
                  <th scope="col">Case #</th>
                  <th scope="col">Victim's Name</th>
                  <th scope="col">Sex</th>
                  <th scope="col">Location</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.reportID}>
                    <th scope="row">
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
                        )}{" "}
                        {report.reportID}
                      </p>
                    </th>
                    <td>
                      <p className="m-0 mt-1">{report.victimName}</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">{report.gender}</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">{report.location}</p>
                    </td>
                    <td>
                      <p className="m-0 mt-1">
                        {new Date(report.date).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="d-flex justify-content-center gap-2">
                      {!report.isAddress && (
                        <button
                          className="btn btn-success text-light py-1"
                          onClick={() => handleAddressed(report.reportID)}
                        >
                          Mark as Addressed
                        </button>
                      )}
                      <Link to={`/Admin/CaseDetails/${report.reportID}`}>
                        <button className="primaryButton text-light">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
