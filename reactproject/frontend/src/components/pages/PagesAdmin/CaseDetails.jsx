import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import sampleImage from "../../../assets/Background.jpg"; // Example image for placeholders
import MainLayout from "../../Layouts/MainLayout";

const CaseDetails = () => {
  const { reportID } = useParams(); // Get reportID from the route parameter
  const [caseDetails, setCaseDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch case details based on reportID
    axios
      .get(`http://localhost:8081/reports/${reportID}`)
      .then((response) => {
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

  if (error) {
    return (
      <MainLayout ActiveTab="Complaints">
        <div className="d-flex justify-content-center py-3">
          <p className="text-danger">{error}</p>
        </div>
      </MainLayout>
    );
  }

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
            {/* Victim Details */}
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

            <div className="d-flex flex-column justify-content-between">
              <div>
                <h5 className="mt-3">Proof of Incident</h5>
                <div className="d-flex gap-2">
                  <div onClick={() => handleImageClick(document)}>
                    <div
                      className="supportImageContainer overflow-hidden border-0"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={`http://localhost:8081${caseDetails.supportingDocuments}`} // Displaying the supporting document as an image
                        alt={`Supporting Document`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-2">
              <button className="primaryButton w-100 py-2" type="submit">
                Submit
              </button>
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
