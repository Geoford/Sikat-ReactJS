import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import sampleImage from "../../../assets/Background.jpg"; // Example image for placeholders
import MainLayout from "../../Layouts/MainLayout";

const CaseDetails = () => {
  const { reportID } = useParams(); // Get reportID from the route parameter
  const [caseDetails, setCaseDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch case details based on reportID
    axios
      .get(`http://localhost:8081/reports/${reportID}`)
      .then((response) => {
        console.log(response.data);
        setCaseDetails(response.data);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to load case details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reportID]);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <MainLayout ActiveTab="Complaints">
        <div className="d-flex justify-content-center py-3">
          <p>Loading case details...</p>
        </div>
      </MainLayout>
    );
  }

  const documents = Array.isArray(caseDetails.supportingDocuments)
    ? caseDetails.supportingDocuments
    : [caseDetails.supportingDocuments];
  // If it's not an array, convert it into one

  if (error) {
    return (
      <MainLayout ActiveTab="Complaints">
        <div className="d-flex justify-content-center py-3">
          <p className="text-danger">{error}</p>
        </div>
      </MainLayout>
    );
  }

  const downloadData = (format) => {
    if (format === "html") {
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Case Details</title>
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
          <h1>Case Details</h1>
          <table>
            <thead>
              <tr>
                <th>Victim's Name</th>
                <th>Sex</th>
                <th>Contact Number</th>
                <th>Preprators Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              ${caseDetails
                .map(
                  (caseDetail) => `
                <tr>
                  <td>${caseDetail.victimName}</td>
                  <td>${caseDetail.gender}</td>
                  <td>${caseDetail.contactInfo}</td>
                  <td>${caseDetail.perpetratorName}</td>
                  <td>${caseDetail.location}</td>
                  <td>${caseDetail.date}</td>
                  <td>${caseDetail.incidentDescription}</td>
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
      link.download = "case_details.html";
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
    <MainLayout ActiveTab="Complaints">
      <div className="d-flex justify-content-center py-3">
        <div
          className="rounded shadow p-3"
          style={{
            backgroundColor: "#ffff",
            width: "clamp(30rem, 70vw, 50rem)",
          }}
        >
          <div className="position-relative border-bottom border-2 d-flex align-items-end justify-content-center gap-2 pb-2">
            <Link
              className="position-absolute text-dark"
              style={{ left: "0" }}
              to="/Admin/GenderBasedIncidents"
            >
              <i className="bx bx-arrow-back bx-sm"></i>
            </Link>

            <h4 className="m-0">Case Details</h4>
            {caseDetails.isAddress === 0 ? (
              <h4 className="m-0 text-danger">(Pending)</h4>
            ) : (
              <h4 className="m-0 text-success">(Addressed)</h4>
            )}
          </div>

          <form className="text-start" style={{ minHeight: "20rem" }}>
            <h5 className="mt-3">Victim Details</h5>
            <div className="px-2 d-flex flex-column gap-2">
              <div className="row">
                <div className="col-md-7">
                  <h6 className="m-0">Name</h6>
                  <p className="m-0 ps-2 border-bottom">
                    {caseDetails.victimName}
                  </p>
                </div>
                <div className="col-md">
                  <h6 className="m-0">Sex</h6>
                  <p className="m-0 ps-2 border-bottom">{caseDetails.gender}</p>
                </div>
              </div>

              <div>
                <h6 className="m-0">Contact Number</h6>
                <p className="m-0 ps-2 border-bottom">
                  {caseDetails.contactInfo}
                </p>
              </div>
            </div>
            {/* Incident Details */}
            <h5 className="mt-3">Incident Details</h5>
            <div className="px-2 d-flex flex-column gap-3">
              <div className="row">
                <div className="col-md-7">
                  <h6 className="m-0">Perpetrator's Name</h6>
                  <p className="m-0 ps-2 border-bottom">
                    {caseDetails.perpetratorName}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <h6 className="m-0">Location</h6>
                  <p className="m-0 ps-2 border-bottom">
                    {caseDetails.location}
                  </p>
                </div>
                <div className="col-md">
                  <h6 className="m-0">Date</h6>
                  <p className="m-0 ps-2 border-bottom">
                    {new Date(caseDetails.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <h6 className="m-0">Description</h6>
                <p className="m-0 ps-2 pb-2 border-bottom">
                  {caseDetails.incidentDescription}
                </p>
              </div>
            </div>

            <div>
              <h5 className="mt-3">Proof of Incident</h5>
              <div className="d-flex flex-wrap gap-2">
                {caseDetails.supportingDocuments &&
                Array.isArray(JSON.parse(caseDetails.supportingDocuments)) &&
                JSON.parse(caseDetails.supportingDocuments).length > 0 ? (
                  JSON.parse(caseDetails.supportingDocuments).map(
                    (document, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleImageClick(`http://localhost:8081${document}`)
                        }
                      >
                        <div
                          className="supportImageContainer overflow-hidden border-0"
                          style={{
                            cursor: "pointer",
                            width: "100px",
                            height: "100px",
                          }}
                        >
                          <img
                            src={`http://localhost:8081${document}`} // Displaying the supporting document as an image
                            alt={`Supporting Document ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <p>No supporting documents available.</p>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end flex-column gap-1 mt-2">
              {caseDetails.isAddress ? (
                ""
              ) : (
                <button className="primaryButton w-100 py-2" type="submit">
                  <p className="m-0">Mark as Addressed</p>
                </button>
              )}

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
          </form>
        </div>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Body className="p-0 d-flex justify-content-center">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Enlarged proof"
                style={{ width: "auto", height: "60vh" }}
              />
            )}
          </Modal.Body>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default CaseDetails;
