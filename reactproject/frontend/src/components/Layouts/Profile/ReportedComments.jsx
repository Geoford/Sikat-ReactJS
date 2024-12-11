import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const ReportedComments = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <div>
      <button
        className="btn btn-danger d-flex align-items-center py-2 px-3"
        onClick={handleShow}
        style={{ height: "100%" }}
      >
        <i class="bx bx-message-alt-error d-md-none"></i>
        <h6 className="m-0 d-none d-md-block">Reported Comments: 0</h6>
      </button>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">Reported Comments</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="overflow-y-scroll custom-scrollbar pe-1"
            style={{ height: "20rem" }}
          >
            <div>
              <Link className="text-decoration-none text-dark">
                <h5
                  className="m-0 grayHover px-3 py-2 rounded"
                  style={{ backgroundColor: "transparent" }}
                >
                  Sample Comments
                </h5>
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReportedComments;
