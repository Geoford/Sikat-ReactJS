import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout";
import axios from "axios";

export default function GenderBasedIncidents() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/reports")
      .then((response) => {
        setReports(response.data);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Failed to fetch reports");
      });
  }, []);
  return (
    <MainLayout ActiveTab="Complaints">
      <div className="mt-4">
        <h2 className="fw-bold m-0">Gender-Based Incidents Complaints</h2>
        <div className="container-fluid container-lg mb-2">
          <h3 className="text-start">Case Status</h3>
          <div className="d-flex gap-2">
            <div className="rounded p-3" style={{ backgroundColor: "#ffff" }}>
              <h5 className="m-0">Awaiting Review {reports.length}</h5>
            </div>
            <div className="bg-success rounded text-light p-3">
              <h5 className="m-0">Addressed 0</h5>
            </div>
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
                {reports.map((report) => (
                  <tr key={report.reportID}>
                    <th scope="row">
                      <p className="m-0 mt-1">{report.reportID}</p>
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
                      <button className="btn btn-success text-light py-1">
                        Mark as Addressed
                      </button>
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
