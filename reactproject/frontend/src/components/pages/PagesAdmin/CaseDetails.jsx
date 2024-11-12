import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import sampleImage from "../../../assets/Background.jpg";
import MainLayout from "../../Layouts/MainLayout";
import { Link, useNavigate } from "react-router-dom";

const CaseDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
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
              <i class="bx bx-arrow-back bx-sm"></i>
            </Link>

            <h4 className="m-0">Case Details</h4>
            <h4 className="m-0 text-danger">Pending</h4>
          </div>

          <form className="text-start" style={{ minHeight: "20rem" }}>
            {/* Report Details */}
            <h5 className="mt-3">Victim Details</h5>
            <div className="px-2 d-flex flex-column gap-2">
              <div className="row">
                <div className="col-md-7">
                  <h6 className="m-0">Name</h6>
                  <p className="m-0 ps-2 border-bottom">Juan Dela Cruz</p>
                </div>
                <div className="col-md">
                  <h6 className="m-0">Sex</h6>
                  <p className="m-0 ps-2 border-bottom">Male</p>
                </div>
              </div>

              <div>
                <h6 className="m-0">Contact Number</h6>
                <p className="m-0 ps-2 border-bottom">09123456789</p>
              </div>
            </div>

            {/* Incident Details */}
            <h5 className="mt-3">Incident Details</h5>
            <div className="px-2 d-flex flex-column gap-3">
              <div className="row">
                <div className="col-md-7">
                  <h6 className="m-0">Perpetrator's Name</h6>
                  <p className="m-0 ps-2 border-bottom">John Doe</p>
                </div>
                <div className="col-md">
                  <h6 className="m-0">Sex</h6>
                  <p className="m-0 ps-2 border-bottom">Male</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <h6 className="m-0">Location</h6>
                  <p className="m-0 ps-2 border-bottom">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Totam, quos.
                  </p>
                </div>
                <div className="col-md">
                  <h6 className="m-0">Date</h6>
                  <p className="m-0 ps-2 border-bottom">Male</p>
                </div>
              </div>
              <div>
                <h6 className="m-0">Description</h6>
                <p className="m-0 ps-2 pb-2 border-bottom">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
                  nihil sapiente harum in expedita sed quia possimus, veritatis
                  rerum. In culpa modi totam ipsam dignissimos quis beatae
                  incidunt laborum tempora!
                </p>
              </div>
            </div>

            <div className="d-flex flex-column justify-content-between">
              <div>
                <h5 className="mt-3">Proof of Incident</h5>
                <div className="d-flex gap-2">
                  {[
                    sampleImage,
                    sampleImage,
                    sampleImage,
                    sampleImage,
                    sampleImage,
                  ].map((image, index) => (
                    <div key={index} onClick={() => handleImageClick(image)}>
                      <div
                        className="supportImageContainer overflow-hidden border-0"
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={image}
                          alt={`Proof ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>
                  ))}
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

        {/* Modal for Image */}
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
