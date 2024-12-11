import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const FlaggedDiaries = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <div>
      <button
        className="btn btn-danger py-2 px-3"
        onClick={handleShow}
        style={{ height: "100%" }}
      >
        <h6 className="m-0">Flagged Diaries: 0</h6>
      </button>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4 className="m-0">Flagged Diaries</h4>
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
                  Diary Title
                </h5>
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FlaggedDiaries;
